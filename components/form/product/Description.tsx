import React from "react";

const Description = ({ description }: { description: string }) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <p>Title</p>
      <p>{description}</p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam
        quisquam perferendis ratione reiciendis quia facere ipsam, placeat
        voluptas cumque vel recusandae quidem amet illo consequuntur quae
        molestias enim excepturi distinctio?
      </p>
    </div>
  );
};

export default Description;