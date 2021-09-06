/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Pane, DuplicateIcon, IconButton, Tooltip,
} from 'evergreen-ui';
import { config } from '@config';

const DonationBox = () => {
  const [donated, setDonated] = useState(-1);
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    fetch(`https://api.bscscan.com/api?module=account&action=balance&address=${config.donationAddress}&apikey=${config.bscScanApiKey}`)
      .then((res) => res.json())
      .then((json) => {
        const bnb = parseInt(json.result.padStart(19, '0').slice(0, 5), 10) / 10000;
        setDonated(bnb);
      })
      .catch((err) => setError(true));
  }, []);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(config.donationAddress);
  };

  return (
    <Pane>
      <Pane textAlign="center">
        {t('donation_message')}<br />
      </Pane>
      <Pane marginTop="16px" textAlign="center" wordBreak="break-all">
        {config.donationAddress}
        <span style={{ marginLeft: '8px', position: 'relative', top: '-2px' }}>
          <Tooltip content={t('copy_address')}>
            <IconButton className="no-shadow" icon={DuplicateIcon} iconSize={10} size="small" onClick={copyAddress} />
          </Tooltip>
        </span>
      </Pane>
      {donated > -1 && !error && (
        <>
          <Pane display="flex" justifyContent="center" marginTop="12px" marginBottom="2px">
            {donated.toFixed(4)} / {config.donationGoal} BNB alcanzado
          </Pane>
          <Pane
            position="relative"
            width="100%"
            height="24px"
          >
            <Pane
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="24px"
              backgroundColor="#fafafa"
              borderRadius="4px"
            />
            <Pane
              position="absolute"
              top={0}
              left={0}
              zIndex={10}
              width={`${(donated / config.donationGoal) * 100}%`}
              height="24px"
              backgroundColor="#238636"
              borderRadius="4px"
            />
          </Pane>
        </>
      )}
    </Pane>
  );
};

export default DonationBox;
