class NewsDto:
    def __init__(self, title: str, url: str, date: str, source: str, lat: float, lon: float, intensity: float, thumbnail_url: str = None,):
        self.title = title
        self.url = url
        self.thumbnailUrl = thumbnail_url
        self.date = date
        self.lat = lat
        self.lon = lon
        self.intensity = intensity
        self.source = source

    def __str__(self):
        return f"Title: {self.title}\nURL: {self.url}\nImage URL: {self.thumbnailUrl}\n"
    