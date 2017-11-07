import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Pin } from './pin';

const WS_URL = 'ws://127.0.0.1:8080/ws';

@Injectable()
export class PinService {
	public messages: Subject<Pin>;

	/*
	constructor(wsService: StompWebsocketService) {
		this.messages = <Subject<Pin>>wsService
			.connect(WS_URL)
			.map((response: MessageEvent): Pin => {
				let data = JSON.parse(response.data);
				console.log(data);
				return {
                    id: data.id,
                    url: data.url,
					description: data.description
				}
			});
	}*/
}