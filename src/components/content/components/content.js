import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Table } from "antd";
function ContentComponent({ dataSource, title, columns, handleAdd }) {
  return (
    <div>
      <Divider orientation="left" orientationMargin={0}>
        {title}
      </Divider>

      <div>
        <Table
          bordered
          columns={columns}
          dataSource={dataSource}
          tableLayout="auto"
        />
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 16,
          right: 20,
          zIndex: 999,
        }}
      >
        <Button
          className="add_btn"
          style={{
            display: "flex",
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderRadius: 50,
            alignItems: "center",
          }}
          type="primary"
          onClick={handleAdd}
        >
          <PlusOutlined style={{ fontSize: 20 }} />
        </Button>
      </div>
    </div>
  );
}

export default ContentComponent;
