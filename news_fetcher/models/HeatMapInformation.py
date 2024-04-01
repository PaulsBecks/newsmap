class HeatMapInformation:
    lon: float
    lat: float
    intensity: float
    
    def __init__(self, lon: float, lat: float, intensity: float):
        self.lon = lon
        self.lat = lat
        self.intensity = intensity