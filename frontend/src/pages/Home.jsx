import ItemList from "../components/molecules/item/ItemList"
import Header from "../components/header/Header"
import Hero from '../components/hero/Hero';
import Footer from "../components/footer/Footer"

const Home = () => {

    return (
        <>
            <Header></Header>
            <Hero/>
            <ItemList></ItemList>
            <Footer />
        </>
    )
}

export default Home;

