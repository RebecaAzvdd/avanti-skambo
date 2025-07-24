import { useState, useRef } from "react";
import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";
import ItemSection from "../components/molecules/ItemSection/ItemSection";
import ProposalModal from "../components/molecules/ProposalModal/ProposalModal";
import Footer from "../components/footer/Footer";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTargetItem, setCurrentTargetItem] = useState(null);

  // 1. Cria uma referência para a seção de itens
  const itemSectionRef = useRef(null);

  const handleOpenProposalModal = (item) => {
    setCurrentTargetItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleScrollToItems = () => {
    itemSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <Hero onExploreClick={handleScrollToItems} />

      <div ref={itemSectionRef}>
        <ItemSection onProposeClick={handleOpenProposalModal} />
      </div>
      
      <ProposalModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        targetItem={currentTargetItem}
      />
      <Footer />
    </>
  );
};

export default Home;