export default interface NewsEntry {
  lon: number;
  lat: number;
  intensity: number;
  title: string;
  thumbnailUrl: string | null;
  url: string;
  source: string;
}
