import React from 'react';

const obj = {
  name: "this is title",
  description: "<h1>this is heading</h1><p>this is paragraph</p>",
};

const compo = () => {
  return (
    <div>
      <h1>{obj?.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: obj?.description }} />
    </div>
  );
};

export default compo;
