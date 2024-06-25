import React from 'react';
import { WhatsappShareButton, WhatsappIcon, EmailShareButton, EmailIcon, TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, InstapaperShareButton, InstapaperIcon } from 'react-share';

const ShareMatchCode = ({ open, setOpen, matchCode }) => {
  // The URL you want to share
  // const shareUrl = `https://konfehti.com/match?rmc=${matchCode}`;
  const shareUrl = `${process.env.GATSBY_WEBSITE_BASE_URL}match?rmc=${matchCode}`;
  

  // Your message to share alongside the URL
  const title = `${""}Play Konfehti Games with me!
    Room Code:  ${matchCode}
    Login > Match > Join > Play with Friends > Enter Room code.
    OR,
    Click below to join:
    `;

    const subject = `Play Konfehti Games with me! ${matchCode}`;
    const body = `Let's play a game together! Use this match code to join: ${matchCode}\n\nJoin here: https://example.com/game/${matchCode}`;

  return open ? (
    <div>
      <div className='mt-8'>
        {/* WhatsApp Share */}
        <WhatsappShareButton className='mx-2' url={shareUrl} title={title} separator=" - ">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>

        {/* Email Share */}
        <EmailShareButton className='mx-2' url={shareUrl} subject={subject} body={body}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      
      </div>
    </div>
  ) : null;
};

export default ShareMatchCode;
