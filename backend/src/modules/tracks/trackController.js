import { AppError } from '../../core/errors.js';
import * as trackRepository from './trackRepository.js';

export async function listTracks() {
  const tracks = await trackRepository.listTracks();
  return { tracks };
}

export async function getTrackBySlug({ params }) {
  const track = await trackRepository.findTrackBySlug(params.slug);
  if (!track) {
    throw new AppError('TRACK_NOT_FOUND', 404, 'Trilha não encontrada.');
  }
  return { track };
}