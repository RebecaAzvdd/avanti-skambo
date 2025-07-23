import { useState } from "react";
import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";
import ItemSection from "../components/molecules/ItemSection/ItemSection";
import ProposalModal from "../components/molecules/ProposalModal/ProposalModal";
import Footer from "../components/footer/Footer";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTargetItem, setCurrentTargetItem] = useState(null);

  const handleOpenProposalModal = (item) => {
    setCurrentTargetItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header></Header>
      <Hero />
      <ItemSection onProposeClick={handleOpenProposalModal} />
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
