import { Breadcrumb } from "antd";
import React from "react";

function BreadcrumbComponent({ recipe, preparation, ingredient }) {
  return (
    <div>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>DashBoard</Breadcrumb.Item>
        <Breadcrumb.Item>
          {(recipe && "recipe") ||
            (preparation && "preparation") ||
            (ingredient && "ingredient")}
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default BreadcrumbComponent;
