import axios from "axios";
import { mens_kurta } from "../../Data/menA";
import MainCarousel from "../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../components/HomeSectionCarousel/HomeSectionCarousel";
import { API_BASE_URL } from "../../config/apiConfig";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/homepage`)
      const { data } = response
      console.log(data);
      setData(data)

    } catch (error) {

    }
  }
  return (
    <>
      <MainCarousel />
      <div className="space-y-10 py-10 flex flex-col justify-center px-5 lg:px-10 bg-white">
        {
          data.length > 0
          &&
          data.map((item) => {
            return (<HomeSectionCarousel key={item.id} data={item.products} section={item.name} />)
          })

        }
        
      </div>
    </>
  );
};

export default HomePage;
