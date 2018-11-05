import {
    Component,
    Input, OnInit, ViewChild, OnDestroy, ChangeDetectorRef, TemplateRef, ViewContainerRef
} from '@angular/core';
import { UserActionViewModelConfiguration, UserActionType } from '../../../shared/model/user-action.model';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { UserActionService } from '../../services/user-action.service';

@Component({
    selector: 'mibi-action-item-list',
    templateUrl: './action-item-list.component.html',
    styleUrls: ['./action-item-list.component.scss']
})
export class ActionItemListComponent implements OnInit, OnDestroy {

    @Input() configuration$: Observable<UserActionViewModelConfiguration[]>;
    @ViewChild('actionList', { read: ViewContainerRef }) actionItemHost: ViewContainerRef;
    @ViewChild('customActionItems')
    private customActionItems: TemplateRef<any>;
    @ViewChild('uploadActionItem')
    private uploadActionItem: TemplateRef<any>;
    private componentActive: boolean = true;
    constructor(private _changeDetectionRef: ChangeDetectorRef, private userActionService: UserActionService) { }

    ngOnInit(): void {
        this.configuration$.pipe(
            takeWhile(() => this.componentActive)).subscribe(
                (configuration: UserActionViewModelConfiguration[]) => {

                    const viewContainerRef = this.actionItemHost;
                    viewContainerRef.clear();
                    for (let i = 0; i < configuration.length; i++) {
                        const myConfig = { ...configuration[i] };
                        myConfig.template = this.getTemplate(myConfig.type);
                        this.userActionService.createComponent(viewContainerRef, myConfig);
                    }
                    this._changeDetectionRef.detectChanges();
                }
            );

    }

    ngOnDestroy(): void {
        this.componentActive = false;
    }

    private getTemplate(type: UserActionType): TemplateRef<any> {
        switch (type) {
            case UserActionType.UPLOAD:
                return this.uploadActionItem;
            default:
                return this.customActionItems;
        }
    }
}