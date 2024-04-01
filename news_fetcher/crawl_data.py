import requests
import json
import os
import dotenv
from openai import OpenAI

dotenv.load_dotenv()

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])


class HeatMapInformation:
    lon: float
    lat: float
    intensity: float
    
    def __init__(self, lon: float, lat: float, intensity: float):
        self.lon = lon
        self.lat = lat
        self.intensity = intensity

def crawl_news():

    url = "https://www.tagesschau.de/api2/news/"
    response = requests.get(url)
    data = response.json()
    news = data["news"]

    with open("ard_data.json", "w") as f:
        json.dump(news, f)
        
    print("Data fetched and saved to ard_data.json")
    
def fetch_lon_lat_intensity_from_chat_gpt(news_information: str) -> HeatMapInformation:
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": """I will send you a german news article.
        Please provide me with the longitude, latitude and intensity of the news. The longitude and latitude should locate the place of the scene of the news. Most news events play in a town, city or country. Try to be precise. The intesity has to be between 0 and 1. It describes how impactful the events behind the news are. I want to get the information in the following format: 
        {"lon":<longitude>, "lat":<latitude>, "intensity":<intensity>}
        Return this format and only this format. Do not add any other character or words. A machine has to can parse it. Thanks a lot!"""},
            {"role": "user", "content": news_information}
        ]
    )
    for choice in completion.choices:
        print(choice.message.content)
        return HeatMapInformation(**json.loads(choice.message.content))
    
def find_news_by_id_in_list(news_list, id):
    return next((news for news in news_list if news["sophoraId"] == id), None)

def enrich_news_with_lon_lat():
    with open("ard_data.json") as f:
        data = json.load(f)
        
    already_enriched_news_list = already_enriched_news()
    for news in data:
        # check if news is already enriched
        enriched_news = find_news_by_id_in_list(already_enriched_news_list, news["sophoraId"])
        if enriched_news is not None:
            news["lon"] = enriched_news["lon"]
            news["lat"] = enriched_news["lat"]
            news["intensity"] = enriched_news["intensity"]
        else:
            # get lon and lat from chatGPT
            useful_text = news["title"] + " " + news.get("firstSentence", "") + json.dumps(news.get("tags", "[]"))
            print('analyzing: ', useful_text)
            heat_map_info = fetch_lon_lat_intensity_from_chat_gpt(useful_text)
    
            news["lon"] = heat_map_info.lon
            news["lat"] = heat_map_info.lat
            news["intensity"] = heat_map_info.intensity
        
    with open("ard_data_enriched.json", "w") as f:
        json.dump(data, f)
    
    print("Data enriched and saved to ard_data_enriched.json")
    return data

def filter_unlocated_news():
    with open("ard_data_enriched.json") as f:
        data = json.load(f)
        
    data = [news for news in data if "lon" in news and "lat" in news and "intensity" in news and news["lat"] != 0 and news["lon"] != 0 and news["lat"] != None and news["lon"] != None and news.get("detailsweb", None) is not None and news.get("teaserImage", None) is not None]
    mappedData = list(map(lambda news: {"lon": news["lon"], "lat": news["lat"], "intensity": news["intensity"], "title": news["title"], "date": news["date"], "firstSentence": news.get("firstSentence", None), "url": news.get("detailsweb", None), "thumbnailUrl": news["teaserImage"]["imageVariants"]["16x9-512"]}, data))
    with open("../src/data/news_data.json", "w") as f:
        json.dump(mappedData, f)
        
    print("Data filtered and saved to ard_data_enriched_filtered.json")

def already_enriched_news():
    with open("ard_data_enriched.json") as f:
        data = json.load(f)
    return data

def filter_already_collected_news():
    with open("ard_data_enriched.json") as f:
        old_news = json.load(f)
    
    with open("ard_data.json") as f:
        new_news = json.load(f)
    
    old_news_keys = [news["sophoraId"] for news in old_news]
    return [news for news in new_news if news["sophoraId"] not in old_news_keys]
    
    
if __name__ == "__main__":
    crawl_news()
    enrich_news_with_lon_lat()
    filter_unlocated_news()