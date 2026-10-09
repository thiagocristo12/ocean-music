import { apiClient } from './apiClient.js';

export async function listTracks() {
  const { tracks } = await apiClient.get('/tracks');
  return tracks;
}

export async function getTrack(slug) {
  const { track } = await apiClient.get(`/tracks/${slug}`);
  return track;
}