import {Component} from '@angular/core';

@Component({
    selector:'app-server',
    templateUrl:'./server.component.html'
})

export class ServerComponent{
    serverId = 1001;
    serverStatus = 'online';

    changeStatus(){

        var btnDanger = document.getElementById('danger');
        var btnSuccess = document.getElementById('success');

        if(this.serverStatus == 'offline')
        {
            this.serverStatus = 'online';
            btnDanger.style.display = "block";
            btnSuccess.style.display = "none";
        }
        else{
            this.serverStatus = 'offline';
            btnDanger.style.display = "none";
            btnSuccess.style.display = "block";
            
        }
    }
}