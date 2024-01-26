import React from 'react';

const obj = {
  name: "this is title",
  description: "<h2>this is heading</h2><p>this is paragraph</p>",
};

const compo = () => {
  return (
    <div>
      <h2>{obj?.name}</h2>
      <div dangerouslySetInnerHTML={{ __html: obj?.description }} />
    </div>
  );
};

export default compo;
