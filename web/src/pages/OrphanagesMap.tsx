import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';
import MapIcon from '../utils/MapIcon';
import api from '../services/api';
import Orphanage from './Orphanage';

interface Orphanage {
	id: number,
	name: string,
	latitude: number,
	longitude: number,
}

function OrphanagesMap() {
	const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

	useEffect(() => {
		api.get('orphanages').then(response => {
			setOrphanages(response.data);
		});
	}, []);

	return (
		<div id="page-map">
			<aside>
				<header>
					<img src={mapMarkerImg} alt="Happy" />

					<h2>Escolha um orfanato no mapa</h2>
					<p>Muitas crianças estão esperando a sua visita :)</p>
				</header>

				<footer>
					<strong>Braga</strong>
					<span>São Victor</span>
				</footer>
			</aside>
				{
					orphanages.length > 0 && 
					<Map
						center={[orphanages[0].latitude , orphanages[0].longitude]}
						zoom={15}
						style={{ width: '100%', height: '100%' }}
					>
						
						<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
						{
							orphanages.map(orphanage => {
								return (
									<Marker
										icon={MapIcon}
										position={[orphanage.latitude, orphanage.longitude]}
										key={orphanage.id}
									>
										<Popup
											closeButton={false}
											minWidth={240}
											maxWidth={240}
											className="map-popup"
										>
											{ orphanage.name }

											<Link to={`/orphanages/${orphanage.id}`}>
												
												<FiArrowRight size={20} color="#fff" />
											</Link>
										</Popup>
									</Marker>
								)
							})
						}
					</Map> 
				}

			<Link to="/orphanages/create" className="create-orphanage">
				<FiPlus size="32" color="#fff" />
			</Link>
		</div>
	);
}

export default OrphanagesMap;