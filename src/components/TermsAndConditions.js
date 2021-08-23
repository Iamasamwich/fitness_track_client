import React from 'react';

const TermsAndConditions = ({readTandC}) => {

  const clicked = (e) => {
    if (e.target.id === 'tandcButton') {
      readTandC(true);
    } else {
      readTandC(false);
    };
  }

  return (
    <div 
      className='tandc-popup'
      onClick={e => clicked(e)}>
      <div className="tandc-contents">
        <h1>Terms And Conditions</h1>
        <p>
          These Terms And Conditions relate to the use of this website/web app ("The Cycle Tracker App, The Site, The App")
        </p>
        <p>
          By using The Cycle Tracker App you agree to these Terms And Conditions in their entirety.
        </p>
        <p>
          The users of The Cycle Tracker App understand and agree that:
        </p>
        <ol>
          <li>The developers and adminstrators of The Cycle Tracker App created it for their own amusement, and it shouldn't be treated as a serious service.</li>
          <li>Use of The App is entirely at The User's own risk, including the security of any data they submit to The App.</li>
          <li>No liablity will be taken by the developers, administrators, or owners of The Cycle Tracker App for any losses of any kind resulting from the use of The App.</li>
          <li>The developers, administrators, and owners of The Cycle Tracker App reserve the right to refuse access to The App entirely at their discretion.</li>
          <li>The developers and owners of The Cycle Tracker App reserve the right to amend or delete any data held by The App at any time without prior notice.</li>
          <li>The developers, adminstrators, and owners of The Cycle Tracker App reserve the right to use the data you submit to The App for any purpose.</li>
          <li>The developers, administrators, and owners of The Cycle Tracker App reserve the right to delete The App at any time without prior warning.</li>
        </ol>
        <button id="tandcButton">I have read and agree to this</button>
         {/* onClick={() => readTandC(true)}>I have read and agree to this</button> */}
      </div>
    </div>
  );
};

export default TermsAndConditions;