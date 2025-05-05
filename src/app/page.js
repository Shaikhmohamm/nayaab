"use client";
import Bestseller from "@/components/BestSeller";
import Carousel1 from "@/components/Carousel";
import Footer from "@/components/Footer";
import LeftBar from "@/components/LeftBar";
import RightBar from "@/components/RightBar";


const HomePage = () => {

    return (
        <div className="">
            <div className="flex flex-col lg:flex-row">
                <LeftBar />
                <Carousel1 />
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
