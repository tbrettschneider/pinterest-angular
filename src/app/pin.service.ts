import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { Pin } from './pin';

const WS_URL = 'ws://127.0.0.1:8080/ws';

@Injectable()
export class PinService {
	public messages: Subject<Pin>;

	constructor(wsService: WebsocketService) {
		this.messages = <Subject<Pin>>wsService
			.connect(WS_URL)
			.map((response: MessageEvent): Pin => {
                console.log('XXX XXX XXX XXX');
				let data = JSON.parse(response.data);
				return {
                    id: data.id,
                    url: data.url,
					description: data.description
				}
			});
	}
}