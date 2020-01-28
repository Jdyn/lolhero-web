import React from 'react';
import { flatRanks, unranked } from '../../../lib/ranks';
import Banner from '../Banner';
import styles from './styles.module.css';
import { BoostOrderDetails, UpdateOrder } from '../../../store/boost/types';
import { Request } from '../../../store/request/types';
import Stripes from '../../Reusable/Stripes';

const ranks = flatRanks({ unranked: true });

interface Props {
  updateOrder: UpdateOrder;
  currentOrder: BoostOrderDetails;
  purchaseOrderRequest: Request;
}

interface BannerProps {
  title: string;
  type: string;
  rank: any;
  isStartRank?: boolean;
  isPlacements?: boolean;
}

const BoostDisplay: React.FC<Props> = (props: Props): JSX.Element => {
  const { updateOrder, currentOrder, purchaseOrderRequest } = props;

  const generateBanners = (items: { first: BannerProps; second: BannerProps }): JSX.Element => {
    const { first, second } = items;
    return (
      <>
        {/* <Banner
          title={first.title}
          type={first.type}
          isStartRank={first.isStartRank}
          isPlacements={first.isPlacements}
          rank={first.rank}
          currentOrder={currentOrder}
          updateOrder={updateOrder}
        />
        <Banner
          title={second.title}
          type={second.type}
          isStartRank={second.isStartRank}
          rank={second.rank}
          updateOrder={updateOrder}
          currentOrder={currentOrder}
        /> */}
        <div className={styles.bannerContainer}>
          <Banner
            title={first.title}
            type={first.type}
            isStartRank={first.isStartRank}
            isPlacements={first.isPlacements}
            rank={first.rank}
            currentOrder={currentOrder}
            updateOrder={updateOrder}
          />
        </div>
        <div className={styles.bannerContainer}>
          <Banner
            title={second.title}
            type={second.type}
            isStartRank={second.isStartRank}
            rank={second.rank}
            updateOrder={updateOrder}
            currentOrder={currentOrder}
          />
        </div>
      </>
    );
  };

  const renderContent = (): JSX.Element => {
    const { startRank, desiredRank, collectionName } = currentOrder;

    switch (collectionName) {
      case 'Division Boost':
        return generateBanners({
          first: {
            title: 'Current Rank',
            type: 'division',
            isStartRank: true,
            rank: startRank !== null ? ranks[startRank] : {}
          },
          second: {
            title: 'Desired Rank',
            type: 'division',
            rank: desiredRank !== null ? ranks[desiredRank] : {}
          }
        });
      case 'Placement Games':
        return generateBanners({
          first: {
            title: 'Last Season Rank',
            type: 'division',
            isStartRank: true,
            isPlacements: true,
            rank: startRank !== null ? ranks[startRank] : {}
          },
          second: {
            title: 'Desired Games',
            type: 'slider',
            rank: startRank !== null ? ranks[startRank] : {}
          }
        });
      case 'Net Wins':
        return generateBanners({
          first: {
            title: 'Current Rank',
            type: 'division',
            isStartRank: true,
            rank: startRank !== null ? ranks[startRank] : {}
          },
          second: {
            title: 'Desired Wins',
            type: 'slider',
            rank: startRank !== null ? ranks[startRank] : {}
          }
        });
      case 'Net Games':
        return generateBanners({
          first: {
            title: 'Current Rank',
            type: 'division',
            isStartRank: true,
            rank: startRank !== null ? ranks[startRank] : {}
          },
          second: {
            title: 'Desired Games',
            type: 'slider',
            rank: startRank !== null ? ranks[startRank] : {}
          }
        });
      case 'Normal Games':
        return generateBanners({
          first: {
            title: 'Normal Games',
            type: 'default',
            isStartRank: true,
            rank: ranks[28]
          },
          second: {
            title: 'Desired Games',
            type: 'slider',
            rank: ranks[28]
          }
        });
      default:
        return null;
    }
  };

  return (
    <div className={styles.root}>
      <Stripes zIndex={5} version="v2" />
      <div className={styles.container}>
        <div className={styles.wrapper}>{renderContent()}</div>
        {purchaseOrderRequest.errored && (
          <div className={styles.error}>
            <span>Error: {purchaseOrderRequest.error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoostDisplay;
