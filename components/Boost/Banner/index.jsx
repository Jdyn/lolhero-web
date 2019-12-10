import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';
import BannerRankList from './BannerRankList';
import BannerRankSlider from './BannerRankSlider';

const propTypes = {
  type: PropTypes.oneOf(['slider', 'picker', 'default']),
  height: PropTypes.string,
  rank: PropTypes.object,
  isStartRank: PropTypes.bool,
  updateOrder: PropTypes.func,
  currentOrder: PropTypes.object
};

const Banner = props => {
  const { type, rank, updateOrder, currentOrder, isStartRank } = props;

  const theme = useTheme();
  const classes = useStyles(props);

  const renderContent = {
    default: <></>,
    slider: <BannerRankSlider rank={rank} currentOrder={currentOrder} updateOrder={updateOrder} />,
    picker: (
      <BannerRankList
        rank={rank}
        isStartRank={isStartRank}
        currentOrder={currentOrder}
        updateOrder={updateOrder}
      />
    )
  };

  return (
    <div className={classes.root}>
      <div
        className={classes.container}
        style={{
          backgroundColor: rank.color || theme.secondary,
          borderColor: `${rank.accent || theme.tertiary}`
        }}
      >
        <div className={classes.header}>
          <h1>{rank.title || ''}</h1>
          <h3>{isStartRank ? 'current' : 'desired'}</h3>
        </div>
        {renderContent[type]}
      </div>

      <div className={classes.footer}>
        <svg
          className={classes.foot}
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          style={{
            fill: rank.color || theme.secondary,
            stroke: rank.accent || theme.tertiary
          }}
        >
          <path d="M0 0 L50 100 L100 0 Z" />
        </svg>
      </div>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: props => ({
    zIndex: 5,
    height: props.height || '95%',
    maxHeight: '550px',
    display: 'flex',
    maxWidth: '235px',
    position: 'relative',
    flexGrow: 1,
    margin: '0px 15px 0px 15px',
    marginBottom: '15px',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }),
  container: {
    color: '#fefefe',
    display: 'flex',
    padding: '35px 10px',
    flexGrow: 1,
    boxShadow: '0px -15px 15px rgba(0,0,0,.2)',
    alignItems: 'center',
    borderLeft: `8px solid`,
    borderRight: `8px solid`,
    flexDirection: 'column',
    justifyContent: 'space-between',
    transitionDuration: '.2s',
    '& span': {
      textAlign: 'center'
    }
  },
  amount: {
    fontSize: 67
  },
  header: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    '& h1': {
      margin: '10px 0',
      fontSize: 30,
      minHeight: '36px'
    },
    '& h3': {
      margin: 0,
      color: theme.white,
      fontSize: 16
    }
  },
  footer: props => ({
    width: '100%',
    height: '100px',
    minHeight: '100px',
    backgroundColor: 'transparent',
    fill: 'transparent',
    position: 'relative',
    bottom: 2,
    zIndex: -1,
    filter: 'drop-shadow(0 0px 15px rgba(0,0,0,.35))'
  }),
  foot: {
    transitionDuration: '.2s',
    width: '100%',
    height: '100px',
    position: 'relative',
    strokeWidth: 4
  }
}));

Banner.propTypes = propTypes;

export default Banner;
