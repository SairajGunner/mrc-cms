import { Component } from "react";
import "./EngagementDisplay.scss";

export default class EngagementDisplay extends Component {
    render() {
        return (
            <div className="engagement-display-container">
                <table>
                    <thead>
                        <th>
                            Engagement Name
                        </th>
                        <th>
                            Period
                        </th>
                        <th>
                            Hours / Week
                        </th>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        )
    }
}