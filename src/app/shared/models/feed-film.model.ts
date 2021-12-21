export interface FeedFilm {
  id: string;
  idOriginal: string;
  title: string;
  titleOriginal: string;
  image: string;
  backdropImage: string;
  releaseDate: Date;
  overview: string;
  voteAverage: number;
  createdBy: string;
  createdAt: Date;
  lastModifiedBy: string;
  lastModifiedAt: Date;
  onPlex:boolean;
  torrents: Torrent[];
  type: Type;
}
export interface Torrent {
  torrentId: string;
  torrentTitle: string;
  torrentCroppedTitle: string;
  torrentImage: string;
  torrentQuality: string;
  torrentSize: string;
  torrentUrl: string;
  torrentYear: number;
  torrentPage: TorrentPage;
  downloaded: boolean;
  torrentValidate:boolean;
}
export enum TorrentPage {
  DON_TORRENT,
  PCTMIX,
  PCTFENIX
}
export enum Type {
  FILM = 'Film',
  SHOW = 'Show'
}
