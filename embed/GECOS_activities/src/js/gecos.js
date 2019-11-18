const {DeckGL,
      GeoJsonLayer,
      ScatterplotLayer,
      ColumnLayer,
      HexagonLayer,
      AmbientLight,
      PointLight,
      DirectionalLight,
      LightingEffect} = deck;

const DATA_URL = {
      // CH:
      //   'https://raw.githubusercontent.com/geoenergy/geoenergy/GECOS/dat/CH_boundary.geojson', // eslint-disable-line
      // GRAVI:
      //   'https://raw.githubusercontent.com/geoenergy/geoenergy/GECOS/dat/gravi.json', // eslint-disable-line
      S_WAVES:
        'https://raw.githubusercontent.com/geoenergy/geoenergy/GECOS/dat/S-Waves_GEo-01.geojson', // eslint-disable-line
      WELLS:
        'https://raw.githubusercontent.com/geoenergy/geoenergy/GECOS/dat/wells.json',
      // SGS_GRAVI:
      //   'https://raw.githubusercontent.com/geoenergy/geoenergy/GECOS/dat/SGS_gravi.json',
      // SGS_SWISS_ATLAS:
      //   'https://raw.githubusercontent.com/geoenergy/geoenergy/GECOS/dat/SGS_ATLAS.json',
      // SGS_comp1:
      //   'https://raw.githubusercontent.com/geoenergy/geoenergy/GECOS/dat/SGS_gravi_comparison1.json',
      // SGS_comp2:
      //   'https://raw.githubusercontent.com/geoenergy/geoenergy/GECOS/dat/SGS_gravi_comparison2.json',
      // GEOLOGY:
      //   'https://raw.githubusercontent.com/geoenergy/geoenergy/GECOS/dat/geology.geojson',
      // TECTONIC:
      //   'https://raw.githubusercontent.com/geoenergy/geoenergy/GECOS/dat/Tectonic.geojson',
      // SONDES:
      //   'https://raw.githubusercontent.com/geoenergy/geoenergy/GECOS/dat/sondes_geothermiques.json',
      // IDC_BATIMENTS:
      //   'https://raw.githubusercontent.com/geoenergy/geoenergy/GECOS/dat/IDC_batiments.geojson',
      // S_WAVES:
      //   'https://raw.githubusercontent.com/geoenergy/geoenergy/GECOS/dat/S-Waves_GEo-01.geojson'
}

// Data
    // const PROJECTS = [
    //
    //   {"project":"GEo-01 well","latitude":46.2216243,"longitude":6.0468839,"zoom":14,"minZoom":12,"maxZoom":16,"pitch":50,"bearing":0},
    //   {"project":"Thonex-1 well","latitude":46.2018228,"longitude":6.2113378,"zoom":14,"minZoom":12,"maxZoom":16,"pitch":50,"bearing":0},
    //   {"project":"Humilly-2 well","latitude":46.114825,"longitude":6.0250778,"zoom":14,"minZoom":12,"maxZoom":16,"pitch":50,"bearing":0},
    //   {"project": "Reset the view","latitude":46.21,"longitude":6.11,"zoom":11,"minZoom":9,"maxZoom":14,"pitch":50,"bearing":0},
    // ];

    //
    // longitude: 6.11,
    // latitude: 46.21,
    // zoom: 11,
    // minZoom: 9,
    // maxZoom: 14,
    // pitch: 50,
    // bearing: 0,
    // controller: {
    //   scrollZoom: true,
    //   dragRotate: true,
    // },
    // effects: [lightingEffect],



const COLOR_2018 = [66,146,198];
const COLOR_2017 = [107,174,214];
const COLOR_2016 = [158,202,225];
const COLOR_2010 = [198,219,239];
const SWISSTOPO_COLOR = [222,235,247];

const MALM_COLOR = [35,148,247];
const CRETACEOUSINF_COLOR = [110,210,90];



const COLOR_SCALE = d3.scaleQuantile()
  .domain([0,350])
  .range([
    [5,48,97],
    [33,102,172],
    [67,147,195],
    [146,197,222],
    [209,229,240],
    [253,219,199],
    [244,165,130],
    [214,96,77],
    [178,24,43],
    [103,0,31]
  ]);

const COLOR_SCALE_sondes = d3.scaleQuantile()
  .domain([0,130, 160,220])
  .range([
    [239,138,98],
    [247,247,247],
    [103,169,207],
  ]);

const COLOR_SCALE1 = d3.scaleQuantile()
  .domain([980547,980591])
  .range([
    [5,48,97],
    [33,102,172],
    [67,147,195],
    [146,197,222],
    [209,229,240],
    [253,219,199],
    [244,165,130],
    [214,96,77],
    [178,24,43],
    [103,0,31]
  ]);

const COLOR_SCALE2 = d3.scaleQuantile()
  .domain([980546,980592])
  .range([
    [5,48,97],
    [33,102,172],
    [67,147,195],
    [146,197,222],
    [209,229,240],
    [253,219,199],
    [244,165,130],
    [214,96,77],
    [178,24,43],
    [103,0,31]
  ]);

const COLOR_SCALE3 = d3.scaleQuantile()
  .domain([0,5])
  .range([
    [5,48,97],
    [33,102,172],
    [67,147,195],
    [146,197,222],
    [209,229,240],
    [253,219,199],
    [244,165,130],
    [214,96,77],
    [178,24,43],
    [103,0,31]
  ]);

  const COLOR_SCALE4 = d3.scaleQuantile()
    .domain([2,6])
    .range([
      [5,48,97],
      [33,102,172],
      [67,147,195],
      [146,197,222],
      [209,229,240],
      [253,219,199],
      [244,165,130],
      [214,96,77],
      [178,24,43],
      [103,0,31]
    ]);

const COLOR_SCALE_IDC = d3.scaleQuantile()
  .domain([3,1500])
  .range([
    [5,48,97],
    [33,102,172],
    [67,147,195],
    [146,197,222],
    [209,229,240],
    [253,219,199],
    [244,165,130],
    [214,96,77],
    [178,24,43],
    [103,0,31]
  ]);


// create ambient light source
const ambientLight = new AmbientLight({
        color: [255, 255, 255],
        intensity: 1.0
      });

// create point light source
const pointLight = new PointLight({
        color: [255, 255, 255],
        intensity: 2.0,
        // use coordinate system as the same as view state
        position: [-125, 50.5, 5000]
      });

// create directional light source
const directionalLight = new DirectionalLight({
        color: [255, 255, 255],
        intensity: 1.0,
        direction: [-3, -20, -1]
      });
// create lighting effect with light sources
const lightingEffect = new LightingEffect({ambientLight, pointLight, directionalLight});



const deckgl = new DeckGL({
  mapboxApiAccessToken: 'pk.eyJ1IjoibHBlcm96emkiLCJhIjoiY2swejA3dXAzMDlnczNpbG1xZTNxbWFmbyJ9.XKRsSzZlf3G3DWh9p-OV7Q',
  mapStyle: 'mapbox://styles/lperozzi/ck2xo7h5g0kex1cqgx7nscr79',
  // mapStyle: 'mapbox://styles/lperozzi/ck1v1qez009du1cqcimh0ush7',
  longitude: 6.043,
  latitude: 46.2216243,
  zoom: 14,
  minZoom: 13,
  maxZoom: 16,
  pitch: 50,
  bearing: 0,
  controller: {
    scrollZoom: true,
    dragRotate: true,
  },
  effects: [lightingEffect],

});


// // SEISMIC
document.getElementById('november2019').onclick = renderLayer;
document.getElementById('q3q42020').onclick = renderLayer;

// WELLS
document.getElementById('GEo-01').onclick = renderLayer;



renderLayer();

function renderLayer() {


// SEISMIC
  const visibility_seis_112019 = {};
  if (document.getElementById('november2019').checked == true){
    visibility_seis_112019['visible'] = true;
  } else {
    visibility_seis_112019['visible'] = false;
  };

  const visibility_seis_q3q42020 = {};
  if (document.getElementById('q3q42020').checked == true){
    visibility_seis_q3q42020['visible'] = true;
  } else {
    visibility_seis_q3q42020['visible'] = false;
  };



// WELLS
  const visibility_GEo_01 = {};
  if (document.getElementById('GEo-01').checked == true){
    visibility_GEo_01['visible'] = true;
  } else {
    visibility_GEo_01['visible'] = false;
  };







  const layers = [

  new GeoJsonLayer({
    id: 'q34',
    data: DATA_URL.S_WAVES,
    pickable: true,
    stroked: false,
    filled: false,
    extruded: true,
    lineWidthScale: 2,
    lineWidthMinPixels: 1,
    getFillColor: [160, 160, 180, 200],
    getLineColor: d => ((d.properties.acquistion === 'Q3-Q4 2020') ? [241,11,172] : [241,11,172,0]),
    getRadius: 100,
    getLineWidth: 5,
    getElevation: 30,
    onHover: updateTooltip_seismic,
    // ...options,
    ...visibility_seis_q3q42020,

  }),

  new GeoJsonLayer({
    id: 'november2019',
    data: DATA_URL.S_WAVES,
    pickable: true,
    stroked: false,
    filled: false,
    extruded: true,
    lineWidthScale: 2,
    lineWidthMinPixels: 1,
    getFillColor: [160, 160, 180, 200],
    getLineColor: d => ((d.properties.acquistion === 'November 2019') ? [255,195,0] : [255,195,0,0]),
    getRadius: 100,
    getLineWidth: 5,
    getElevation: 30,
    onHover: updateTooltip_seismic,
    // ...options,
    ...visibility_seis_112019,

  }),

  new ScatterplotLayer({
    id: 'GEo-01',
    data: DATA_URL.WELLS,
    radiusScale: 440,
    radiusMinPixels: 0.25,
    getPosition: d => [d.lon, d.lat],
    getFillColor: d => ((d.name === 'GEo-01') ? [255,255,255] : [255,255,255,0]),
    getLineColor: d => ((d.name === 'GEo-01') ? [0,0,0] : [255,255,255,0]),
    stroked: true,
    lineWidthMinPixels: 3,
    pickable: true,
    radiusMinPixels: 1,
    radiusMaxPixels: 10,
    onHover: updateTooltip,
    // ...options,
    ...visibility_GEo_01,
  }),

  ]



  deckgl.setProps({ layers: [layers] });
}




function updateTooltip({x, y, object}) {
  const tooltip = document.getElementById('tooltip');
  if (object) {
    tooltip.style.top = `${y}px`;
    tooltip.style.left = `${x}px`;
    tooltip.innerHTML =
    `<span class='tooltip-body-title'>Distributed Acoustic Sensing (DAS) VSP</span> <br/><br/>
     <span class='tooltip_title'>Where:</span> <span class='gravi_tooltip'>Well ${object.name}</span>\n <br/>
     <span class='tooltip_title'>Acquisition planned:</span> <span class='gravi_tooltip'>January 2020 </span><br/>`;
  } else {
    tooltip.innerHTML = '';
  }
}
function updateTooltip_seismic({x, y, object}) {
  const tooltip = document.getElementById('tooltip');
  if (object) {
    tooltip.style.top = `${y}px`;
    tooltip.style.left = `${x}px`;
    tooltip.innerHTML =
    `<span class='tooltip-body-title'>Seismic S-Waves</span> <br/><br/>
     <span class='tooltip_title'>Acquisition planned:</span> <span class='gravi_tooltip'>${object.properties.acquistion}</span>\n <br/>
     <span class='tooltip_title'>Length:</span> <span class='gravi_tooltip'>${Math.round((object.properties.Length *1000 ) / 1000)} m</span>\n <br/>`;
  } else {
    tooltip.innerHTML = '';
  }
}
