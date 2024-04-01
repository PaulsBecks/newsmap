// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let reactLeaflet: { HeatmapLayer: any };

declare module "react-leaflet-heatmap-layer-v3" {
  export = reactLeaflet;
}
