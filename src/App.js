import React, { useState, useEffect } from 'react';
import MainCont from './component/MainCont';
import ItemDis from './ItemDis';

function App() {
  const itemsFromStorage = JSON.parse(localStorage.getItem('addarr')) || [];
  const [addarr, setaddarr] = useState(itemsFromStorage);

  useEffect(() => {
    localStorage.setItem('addarr', JSON.stringify(addarr));
  }, [addarr]);

  const AddItems = (sub, hou) => {
    const existingItem = addarr.find((item) => item.sub === sub);

    if (existingItem) {
      // Item already exists, update the hours
      const updatedArr = addarr.map((item) =>
        item.sub === sub ? { ...item, hou: item.hou + hou } : item
      );
      setaddarr(updatedArr);
    } else {
      // Item doesn't exist, add a new item
      const newItem = { sub, hou };
      setaddarr([...addarr, newItem]);
    }
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <MainCont items={AddItems}></MainCont>
      <ItemDis list={addarr} onUpdateList={setaddarr}></ItemDis>

    </div>
  );
}

export default App;
