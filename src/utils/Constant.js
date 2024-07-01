// markers
export const markers = [
  {
    geocode: [16.82720614554767, 91.17821394287968],
    startPosition: [16.82720614554767, 91.17821394287968],
    popUp: "Unknown",
    targetType: 2,
    iconType: 32,
    color: '#FFE605',
    info:{
      Name : "Unknown",
      Callsign: "Unknown",
      Destination: "India",
      Heading: 250,
      Speed : "20 Kn",
      Type : "Unknown",
      Status: "Moving"
    },
    geoLocationMovement: [-0.002, -0.005]
  },
  {
    geocode: [13.008146133233833, 86.46240234375001],
    startPosition: [13.008146133233833, 86.46240234375001],
    popUp: "Own System",
    targetType: 0,
    iconType: 0,
    color: '#',
    info:{
      Name : "STEFAN 1",
      Callsign: "5BQX3",
      Destination: "GBTIL",
      Heading: 345,
      Speed : "13 Nu",
      Type : "Cargo",
      Status: "Moored"
    },
    geoLocationMovement: [0.2, 0.5]
  },
  {
    geocode: [8.743936220084137, 81.42964938709555],
    startPosition: [8.743936220084137, 81.42964938709555],
    popUp: "Surface",
    targetType: 1,
    iconType: 11,
    color: '#FF0505',
    info:{
      Name : "Sagara",
      Callsign: "SLNS-sagara",
      Destination: "Thailand",
      Heading: 65,
      Speed : "15 Kn",
      Type : "Warship",
      Status: "Moving"
    },
    geoLocationMovement: [0.05, 0.1]
  },
  {
    geocode: [9.82283552420517, 92.18860220746066],
    startPosition: [9.82283552420517, 92.18860220746066],
    popUp: "Sub Surface",
    targetType: 3,
    iconType: 23,
    color: '#FF0505',
    info:{
      Name : "201",
      Callsign: "QING Class",
      Destination: "Srilanka",
      Heading: 265,
      Speed : "30 Kn",
      Type : "Submarine",
      Status: "Moving"
    },
    geoLocationMovement: [-0.002, -0.05]
  },
  {
    geocode: [17.71729367227373, 83.33996834982966],
    startPosition: [17.71729367227373, 83.33996834982966],
    popUp: "Surface",
    targetType: 4,
    iconType: 11,
    color: '#FF0505',
    info:{
      Name : "INS Rana",
      Callsign: "Rajput Class",
      Destination: "Uknown",
      Heading: "-",
      Speed : "0 Kn",
      Type : "Warship",
      Status: "Moored"
    },
    geoLocationMovement: [0.0, 0.0]
  },
  {
    geocode: [13.015055331142566, 80.78678238220243],
    startPosition: [13.015055331142566, 80.78678238220243],
    popUp: "Surface",
    targetType: 5,
    iconType: 11,
    color: '#04A5FF',
    info:{
      Name : "HMM-Oslo",
      Callsign: "HMM",
      Destination: "China",
      Heading: 90,
      Speed : "16 Kn",
      Type : "Cargo",
      Status: "Moving"
    },
    geoLocationMovement: [0.0, 0.009]
  },
];


export const restrictedAreas = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [72, 11],
            [75, 11],
            [80, 5],
            [70, 5],
            [72, 10]
          ]
        ]
      }
    }
  ]
};

