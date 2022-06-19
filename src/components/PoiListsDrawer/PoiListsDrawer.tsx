import { useState } from "react";
import { Button, Drawer, List, Collapse, message } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deletePoiFromLists } from "@actions/PoiListsActions";
import { useMap } from "@utils/MapContext";

// type
import { AppState } from "@store/reducers";
import { PoiListsSetting } from "@store/actionTypes/PoiListsSettingTypes";
import { PosLists, PoiInfo } from "@store/actionTypes/PoiListsTypes";

import styles from "./PoiListsDrawer.module.css";

const { Panel } = Collapse;

function PoiListsDrawer() {
  const poiListsSetting: PoiListsSetting = useSelector(
    (state: AppState) => state.poiListsSetting
  );
  const poiLists: PosLists = useSelector((state: AppState) => state.poiLists);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [map] = useMap();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const showPoi = (e, poi: PoiInfo) => {
    e.stopPropagation();
    map.flyTo({
      center: poi.coordinates,
      zoom: poi.zoom,
      essential: true,
    });
  };

  const deletePoi = (e, listName: string, poi: PoiInfo) => {
    e.stopPropagation();
    dispatch(
      deletePoiFromLists({
        id: poi.id,
        listName,
      })
    );
    message.success(`Removed it to ${poiListsSetting[listName]} list`);
  };

  return (
    <>
      <Button
        className={styles.drawerBtn}
        data-testid="open-lists-drawer"
        type="primary"
        shape="circle"
        size="large"
        icon={<UnorderedListOutlined />}
        onClick={showDrawer}
      />
      <Drawer
        title="Saved Places"
        placement="right"
        onClose={onClose}
        visible={visible}
        mask={false}
        bodyStyle={{ padding: 0 }}
      >
        <Collapse bordered={false} defaultActiveKey={["0"]}>
          {Object.entries(poiListsSetting).map(([key, value], index) => {
            return (
              <Panel header={value} key={index}>
                <List
                  itemLayout="horizontal"
                  dataSource={poiLists[key] || []}
                  renderItem={(poi: PoiInfo) => (
                    <List.Item
                      onClick={(e) => showPoi(e, poi)}
                      actions={[
                        <Button
                          onClick={(e) => showPoi(e, poi)}
                          size="small"
                          type="text"
                        >
                          Show
                        </Button>,
                        <Button
                          onClick={(e) => deletePoi(e, key, poi)}
                          size="small"
                          type="text"
                          danger
                        >
                          Delete
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta title={poi.name} description={poi.type} />
                    </List.Item>
                  )}
                />
              </Panel>
            );
          })}
        </Collapse>
      </Drawer>
    </>
  );
}

export default PoiListsDrawer;
