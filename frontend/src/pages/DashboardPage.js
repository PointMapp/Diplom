import React from "react";
import PageWrapper from "../components/PageWrapper";
import DashboardComponent from "../components/Dashboard"; // Импортируем твой UI-кит

const DashboardPage = () => {
  return (
    <PageWrapper>
       {/* Просто вызываем компонент, он сам всё отрисует */}
       <DashboardComponent />
    </PageWrapper>
  );
};

export default DashboardPage;