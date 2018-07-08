// @flow

import L from 'leaflet';
import PropTypes from 'prop-types';

import { MapControl } from 'react-leaflet';
import 'leaflet-toolbar';
import '../../node_modules/leaflet-toolbar/dist/leaflet.toolbar.css';

let controlPositionType = PropTypes.oneOf(['topleft', 'topright', 'bottomleft', 'bottomright',]);

type controlPosition = 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
type LeafletElement = L.Toolbar2.Control;
type Props = {
  className?: string,
  actions?: array,
  position?: controlPosition
};

export default class ToolbarControl extends MapControl<LeafletElement, Props> {
  static propTypes = {
    className: PropTypes.string,
    actions: PropTypes.array,
    position: controlPositionType
  }

  createLeafletElement(props: Props): LeafletElement {
//    console.log(Control === L.Control); => true
//    console.log(Control.Toolbar);
//    console.log(L.Toolbar2.Control);

    return new (L.Toolbar2.Control.extend({}))(props);
  }
}
