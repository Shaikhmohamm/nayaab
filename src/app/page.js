"use client";
import Bestseller from "@/components/BestSeller";
import Carousel1 from "@/components/Carousel";
import Footer from "@/components/Footer";
import LeftBar from "@/components/LeftBar";
import RightBar from "@/components/RightBar";


const HomePage = () => {

    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-2 mx-3 my-2">
                <LeftBar />
                <hr />
                <Carousel1 />
                <hr />
                <RightBar />
            </div>

            <div>
                <Bestseller />
                <Footer />
            </div>
        </div>
    );
};

export default HomePage; 
