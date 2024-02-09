import React from "react";

const AppVersion = () => {
  return (
    <div>
      {" "}
      <h1 className="font-bold">Version</h1>
      <div>
        <h1>Release Notes - Project v1.0.08</h1>
        <h2>Overview</h2>
        <p>
          In version 1.0.08, we are excited to introduce several enhancements
          and improvements to the project. This release focuses on refining
          the user interface, addressing reported issues, and introducing new
          features to enhance the overall user experience.
        </p>
        <h2>New Features</h2>
        <ol>
          <li>
            Redesigned Frontend
            <ol>
              User Interface Overhaul: The frontend has undergone a significant
              redesign, featuring a modern and intuitive user interface.
              Improved Navigation: Streamlined navigation for a more
              user-friendly experience. New layouts and visual elements have
              been implemented to enhance usability.
            </ol>
          </li>
          <li>
            Feature Enhancements
            <ol>
              Dashboard Widgets: New widgets have been added to the dashboard,
              providing at-a-glance insights into key metrics. Users can now
              customize and rearrange widgets to suit their preferences.
              Advanced Search: The search functionality has been enhanced with
              advanced filtering options for more precise results.
            </ol>
          </li>
          <li>
            Bug Fixes{" "}
            <ol>
              Resolved various issues related to: Data synchronization User
              authentication Performance optimization
            </ol>
          </li>
          <li>
            Important Notes{" "}
            <ol>
              Compatibility: Ensure that your system meets the updated system
              requirements for optimal performance. User Guidance: A new user
              guide has been provided to assist users in adapting to the changes
              and utilizing the new features effectively.
            </ol>
          </li>
        </ol>
        <p>Latest Version</p>
        V1.0.05
      </div>
      <div></div>
    </div>
  );
};

export default AppVersion;
