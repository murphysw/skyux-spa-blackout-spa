import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from './configuration';
import PregameDetailsDisplay from './api-models/pregameDetails';
import ScoreboardDisplay from './api-models/scoreboardDisplay';
import GameboardDisplay from './api-models/gameboard';
import PlayerDetailsDisplay from './api-models/playerDetails';

@Injectable()
export class ApiService {
  public basePath: string = 'https://agile-harbor-18005.herokuapp.com';
  // public basePath: string = 'http://localhost:3000';
  public imagePath: string = 'https://murphysw.github.io/card-images';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient) { }

  /* GET Pregame details */
  public getPregame(gameId: string): Observable<PregameDetailsDisplay> {
    let headers = this.getHeaders();
    return this.httpClient.get<PregameDetailsDisplay>(`${this.basePath}/games/${gameId}/pregame`, {headers: headers});
  }

// /* GET Scoreboard */
// router.get('/games/:game_id/scoreboard', DisplayController.getScoreboard);
public getScoreboard(gameId: string): Observable<ScoreboardDisplay> {
  let headers = this.getHeaders();
  return this.httpClient.get<ScoreboardDisplay>(`${this.basePath}/games/${gameId}/scoreboard`, {headers: headers});
}

// /* GET Gameboard */
// router.get('/games/:game_id/gameboard', DisplayController.getGameboard);
public getGameboard(gameId: string): Observable<GameboardDisplay> {
  let headers = this.getHeaders();
  return this.httpClient.get<GameboardDisplay>(`${this.basePath}/games/${gameId}/gameboard`, {headers: headers});
}

// /* GET player details */
// router.get('/games/:game_id/players/:player_id', DisplayController.getPlayerDetails);
public getPlayerDetails(gameId: string, plyerId: string): Observable<PlayerDetailsDisplay> {
  let headers = this.getHeaders();
  return this.httpClient.get<PlayerDetailsDisplay>(`${this.basePath}/games/${gameId}/players/${plyerId}`, {headers: headers});
}

/* GET current games */
public getCurrentGames(): Observable<any> {
  let headers = this.getHeaders();
  return this.httpClient.get<any>(`${this.basePath}/games/`, {headers: headers});
}

/* POST initialize game */
public initializeGame(gameName: string): Observable<any> {
  let headers = this.getHeaders();
  return this.httpClient.post(`${this.basePath}/games/`, {name: gameName}, {headers: headers});
}

// /* DELETE remove game */
// router.delete('/games/:game_id', GameController.removeGame);
public removeGame(gameId: string): Observable<any> {
  let headers = this.getHeaders();
  return this.httpClient.delete(`${this.basePath}/games/${gameId}`, {headers: headers});
}

// /* POST add Player */
// router.post('/games/:game_id/players', GameController.addPlayer);
public addPlayer(gameId: string, playerName: string): Observable<string> {
  let headers = this.getHeaders();
  return this.httpClient.post<string>(`${this.basePath}/games/${gameId}/players`, {name: playerName}, {headers: headers});
}

// /* DELETE remove player */
// router.delete('/games/:game_id/players/:player_id', GameController.removePlayer);
public removePlayer(gameId: string, playerId: string): Observable<any> {
  let headers = this.getHeaders();
  return this.httpClient.delete(`${this.basePath}/games/${gameId}/players/${playerId}`, {headers: headers});
}

// /* POST Finalize setup */
// router.post('/games/:game_id/finalizesetup', GameController.finalizeSetup);
public finishSetup(gameId: string): Observable<any> {
  let headers = this.getHeaders();
  return this.httpClient.post(`${this.basePath}/games/${gameId}/finalizeSetup`, {}, {headers: headers});
}

// /* POST Begin round */
// router.post('/games/:game_id/beginround', GameController.beginRound);
public beginNextRound(gameId: string): Observable<any> {
  let headers = this.getHeaders();
  return this.httpClient.post(`${this.basePath}/games/${gameId}/beginRound`, {}, {headers: headers});
}

// /* POST Place bid */
// router.post('/games/:game_id/players/:player_id/placebid', GameController.placeBid);
public placeBid(gameId: string, playerId: string, bid: number): Observable<any> {
  let headers = this.getHeaders();
  return this.httpClient.post(`${this.basePath}/games/${gameId}/players/${playerId}/placebid`, {bid: bid}, {headers: headers});
}

// /* POST Play card */
// router.post('/games/:game_id/players/:player_id/placecard', GameController.playCard);
public playCard(gameId: string, playerId: string, suit: string, value: number): Observable<any> {
  let headers = this.getHeaders();
  return this.httpClient.post(`${this.basePath}/games/${gameId}/players/${playerId}/placecard`,
    {suit: suit, value: value}, {headers: headers});
}

// /* POST Finish round */
// router.post('/games/:game_id/finishround', GameController.finishRound);
public finishRound(gameId: string): Observable<any> {
  let headers = this.getHeaders();
  return this.httpClient.post(`${this.basePath}/games/${gameId}/finishround`, {}, {headers: headers});
}

/* POST Clear table */
// router.post('/games/:game_id/cleartable', GameController.clearTable);
public clearTable(gameId: string): Observable<any> {
  let headers = this.getHeaders();
  return this.httpClient.post(`${this.basePath}/games/${gameId}/cleartable`, {}, {headers: headers});
}

private getHeaders(): HttpHeaders {
  let headers = this.defaultHeaders;

  // to determine the Accept header
  let httpHeaderAccepts: string[] = [
      'application/json',
      'text/json'
  ];
  const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
  if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
  }
  return headers;
}

}
