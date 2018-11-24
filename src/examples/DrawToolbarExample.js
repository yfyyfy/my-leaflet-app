import React, { Component } from 'react';
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import ToolbarControl from '../controls/ToolbarControl';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw-toolbar/dist/leaflet.draw-toolbar.js';
// import 'leaflet-draw-toolbar';
import './DrawToolbarExample.css';

export default class DrawToolbarExample extends Component {
  state = {
    center: {lat: 51.505, lng: -0.09},
    zoom: 13
  };

  leafletMap() {
    return this._map.leafletElement;
  }

  featureGroup() {
    return this._editableFG.leafletElement;
  }

  gotoSomewhereFunction(place, lat, lon, zoom) {
    return L.Toolbar2.Action.extend({
      options: {
        toolbarIcon: {
          html: '&#9873;',
          tooltip: `Go to ${place}`
        }
      },
      addHooks: () => {
        this.leafletMap().setView([lat, lon], zoom);
      }
    });
  }

  _onMapReady = (map) => {
    this._map = map;
    if (!this._map) {return;}

    this.leafletMap().on('draw:created', (evt) => {
      let layer = evt.layer;
      this.featureGroup().addLayer(layer);
      // console.log(this.featureGroup().toGeoJSON());
      layer.on('click', (event) => {
        new L.Toolbar2.EditToolbar.Popup(event.latlng, {
          actions: [L.Toolbar2.EditAction.Popup.Edit, L.Toolbar2.EditAction.Popup.Delete]
        }).addTo(this.leafletMap(), layer);
      });
    });

    this.leafletMap().on('zoom', (evt) => {
      const zoom = this.leafletMap().getZoom();
      const state = {zoom};
      this.props.maps
        .map((e) => e.current)
        .filter((e) => e != null)
        .forEach((e) => {
          e.setState(state);
          // if (e === this) {return;}
          // e.leafletMap().setZoom(zoom);
      });
    });
    this.leafletMap().on('move', (evt) => {
      const center = this.leafletMap().getCenter();
      const state = {center};
      this.props.maps
        .map((e) => e.current)
        .filter((e) => e != null)
        .forEach((e) => {
          e.setState(state);
          // if (e === this) {return;}
          // e.leafletMap().setView(center);
      });
    });

  }

  _onFeatureGroupReady = (featureGroup) => {
    this._editableFG = featureGroup;
  }

  render() {
    const action1 = this.gotoSomewhereFunction('the Eiffel Tower', 48.85815, 2.29420, 19);
    const action2 = this.gotoSomewhereFunction('japan', 34, 136, 6);

    return (
      <Map ref={this._onMapReady} center={this.state.center} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup ref={this._onFeatureGroupReady}>
        </FeatureGroup>
        <ToolbarControl position="topleft" actions={[action1, action2, L.Toolbar2.DrawAction.Polyline]} className="leaflet-draw-toolbar"/>
      </Map>
    );
  }
}
