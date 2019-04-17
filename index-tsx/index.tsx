/*
 * Copyright 2019 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import * as AppFormer from "appformer-js";

export class AfjsFirstScreen extends AppFormer.Screen {
    private counter: CounterCard;

    constructor() {
        super("AfjsFirstScreen");
        this.af_isReact = true;
        this.af_componentTitle = "AppFormer.js First Screen";
    }

    public af_onClose(): void {
        alert("AppFormer.js First Screen was closed.");
    }

    private resetCounter() {
        this.counter.reset();
    }

    public af_componentRoot() {
        return (
            <>
                <div className={"library container-fluid"}>
                    <div className={"row page-content-kie"}>
                        <div className={"toolbar-pf"}>
                            <div className={"toolbar-pf-actions"}>
                                <div className={"toolbar-data-title-kie"}>
                                    AppFormer.js First Screen
                                </div>
                                <div className={"btn-group toolbar-btn-group-kie"}>
                                    <button
                                        className={"btn btn-default"}
                                        onClick={() => this.resetCounter()}
                                    >
                                        Reset counter
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={"container-fluid"}>
                            <div className={"library container-fluid container-cards-pf"}>
                                <div className={"row row-cards-pf"}>
                                    <CounterCard exposing={self => (this.counter = self)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

interface Props {
    exposing: (self: CounterCard) => void;
}

interface State {
    count: number;
}

class CounterCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { count: 0 };
        this.props.exposing(this);
    }

    public reset() {
        this.setState({ count: 0 });
    }

    private up() {
        this.setState(state => ({ count: state.count! + 1 }));
    }

    private down() {
        this.setState(state => ({ count: Math.max(state.count! - 1, 0) }));
    }

    public render() {
        return (
            <div className={"col-xs-12 col-sm-6 col-md-4 col-lg-3"}>
                <div className={"card-pf card-pf-view"}>
                    <div className={"card-pf-body"}>
                        <div>
                            <h2 className={"card-pf-title"}>
                                <CounterButton label={"+"} onClick={() => this.up()} />
                                <CounterButton label={"-"} onClick={() => this.down()} />
                            </h2>
                            <h5>Click to change count!</h5>
                        </div>
                        <div className={"right"}>
                            <span className={"card-pf-icon-circle"}>{this.state.count}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function CounterButton(props: { onClick: () => void; label: string }) {
    return (
        <button
            style={{ minWidth: "30px", marginRight: "5px" }}
            className={"btn btn-primary"}
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
}

AppFormer.register(new AfjsFirstScreen());
