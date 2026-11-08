---
project: txango
title: A map in your pocket when the signal disappears
draft: false
decisions:
  - title: "Offline first, native stack"
    body: "Kotlin, Compose and Mapsforge, because the renderer is the product and it has to work from local vector tiles with hill shading."
    why: "A map that needs a connection is useless exactly where it is needed."
  - title: "No scraping of private route sites"
    body: "The catalogue comes from open data: OpenStreetMap, Gipuzkoa open data, CNIG trails and user-contributed GPX."
    why: "A catalogue built on someone else's terms is a catalogue that disappears."
  - title: "Weather is fetched, then saved"
    body: "Open-Meteo, cached for the hours of the outing."
    why: "The forecast has to be there at the trailhead, with no coverage."
  - title: "No Google Play Services"
    body: "Location comes from LocationManager. The app runs on a phone with no Google account."
    why: "Every platform dependency is a permission and a battery cost you did not choose."
  - title: "Altitude is part of the model"
    body: "Terrain elevation is stored locally, which makes the profile, the arrival estimate and the sunset warning work offline."
    why: "The features that matter on a mountain are the ones that cannot call home."
stats:
  - { value: '2,034', label: 'routes bundled offline' }
  - { value: '19,737', label: 'points of interest' }
  - { value: '108', label: 'unit tests' }
  - { value: '0', label: 'Google services' }
flow:
  - { label: 'Map', sub: 'vector · offline' }
  - { label: 'Route', sub: 'catalogue or GPX' }
  - { label: 'Hike', sub: 'GPS · alerts' }
  - { label: 'Track', sub: 'survives app close' }
  - { label: 'Backup', sub: 'one zip file' }
---

## The problem

A hiking app that needs a connection is useless exactly where it is needed. In the Basque
mountains the signal comes and goes, the battery is finite, and the phone is the only map
you have. Most route apps solve this by asking you to plan online and hope.

Txango starts from the opposite assumption: the map, the routes, the peaks, the points of
interest and the terrain profile are already on the phone. The network is for downloading
maps and a weather forecast before you leave, and nothing else.

## Architecture

Native Android, no web view and no cross-platform layer.

| Piece | Responsibility |
|---|---|
| `ui/` | Compose screens, five tabs, the view model |
| `map/` | Mapsforge map, track, catalogue, POI and aerial layers |
| `route/` | Tracking, trail routing on a graph, elevation profile, pace |
| `gpx/`, `dem/` | GPX parse and write, terrain elevation |
| `location/` | GPS tracker and the recording service |
| `assets/` | The bundled offline data |

The bundled data is generated, not curated by hand: `tools/` holds Python builders for the
route catalogue, the POIs, the terrain tiles and the map index. Running them is a data
change with a diff, not a script that quietly rewrites the app.

## My role vs. the agents'

I set the offline model, chose the stack and wrote the ADRs that explain why. The parts that
cannot be guessed — the recording service that survives the app being closed, the trail
graph routing, the elevation pipeline, the Room migrations — I specified precisely and
reviewed against tests.

Agents did the bulk of the implementation inside those boundaries, including the Python
generators that rebuild the bundled data. The rule was simple: a schema change ships with an
exported schema and a migration test, or it does not ship.

## Quality and verification

- 108 unit tests, plus migration tests that run on an emulator against real exported schemas.
- Every Room version has its JSON schema committed.
- The offline data pipeline is documented with its failure modes, because Overpass fails
  often and a silent partial download is worse than no download.
- Release builds are installed on a physical device before they are shared.

## Status and what's next

In daily use in Gipuzkoa, with Spanish, Basque and English. Next: a lighter map pack for a
single province, so the first download is minutes instead of a gigabyte.
