import json
import os
from openai import OpenAI
from models.HeatMapInformation import HeatMapInformation

class OpenAIClient:
    def __init__(self):
        self.client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
        
    def fetch_lon_lat_intensity_from_chat_gpt(self, news_information: str) -> HeatMapInformation:
        print("Fetching lon, lat and intensity from chat GPT")
        try:
            completion = self.client.chat.completions.create(
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
                return HeatMapInformation(**json.loads(choice.message.content))
        except:
            return HeatMapInformation(0, 0, 0)