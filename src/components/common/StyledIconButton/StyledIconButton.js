import React from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
const color = require('sc-color');

const useStyles = makeStyles((theme) => {
  const primary = theme.palette.primary.main;

  const bgColor = `linear-gradient(to left, ${color(primary).hue('-6').hex6()} 0%, ${color(primary)
    .hue('+6')
    .hex6()} 51%, ${color(primary).hue('-6').hex6()} 100%)`;

  return {
    root: {
      backgroundImage: bgColor,
      backgroundSize: `200% 100%`,
      transition: '0.01s',
      color: '#fff',
      fill: 'black',
      '&:hover': {
        backgroundPosition: 'right center',
      },
    },
  };
});

/**
 * Renders a <StyledIconButton /> component
 * @param  props
 * @param  props.ariaLabel
 * @param  props.size
 * @param  props.onClick
 * @param  props.children an icon passed in as a child element
 * @param  props.profileMessage
 */
export default function StyledIconButton(props) {
  const classes = useStyles();
  const clone = React.cloneElement(props.children, { style: { fill: 'black' } });
  return (
    <IconButton
      className={clsx(classes.root)}
      aria-label={props.ariaLabel || ''}
      size={props.size || 'medium'}
      color="primary"
      onClick={props.onClick}
    >
      {clone}
    </IconButton>
  );
}
