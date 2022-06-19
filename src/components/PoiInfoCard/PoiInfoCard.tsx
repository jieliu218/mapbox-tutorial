import React from "react";
import { Button, Card, Dropdown, Menu, message } from "antd";
import { MapboxGeoJSONFeature } from "mapbox-gl";
import { useDispatch, useSelector } from "react-redux";
import {
  BookOutlined,
  EllipsisOutlined,
  UnorderedListOutlined,
  HeartFilled,
  PlusOutlined,
  FlagFilled,
} from "@ant-design/icons";
import { FAVORIATES, NEW_LIST, WANT_TO_GO } from "@utils/constants";
import { postPoiToLists, deletePoiFromLists } from "@actions/PoiListsActions";

// type
import { AppState } from "@store/reducers";
import { PoiListsSetting } from "@store/actionTypes/PoiListsSettingTypes";
import { PosLists, PoiInfo } from "@store/actionTypes/PoiListsTypes";
import { ItemType } from "antd/lib/menu/hooks/useItems";

const { Meta } = Card;

interface PoiInfoCardProps {
  feature: MapboxGeoJSONFeature;
}

function PoiInfoCard({ feature }: PoiInfoCardProps) {
  const poiListsSetting: PoiListsSetting = useSelector(
    (state: AppState) => state.poiListsSetting
  );
  const poiLists: PosLists = useSelector((state: AppState) => state.poiLists);
  const dispatch = useDispatch();
  const { name, type } = feature.properties;
  const getMenuItemIcon = (key: string, isSaved: boolean): React.ReactNode => {
    if (key === FAVORIATES) {
      return <HeartFilled style={{ color: isSaved ? "hotpink" : "" }} />;
    } else if (key === WANT_TO_GO) {
      return <FlagFilled style={{ color: isSaved ? "green" : "" }} />;
    }
    return <UnorderedListOutlined />;
  };

  // Check if POI is already saved for selected list
  const checkPoiSavedStatus = (
    listName: string,
    poiId: number | string
  ): boolean => {
    const isSaved = (poiLists[listName] || []).find(
      (poi: PoiInfo) => poi.id === poiId
    );
    return !!isSaved;
  };

  const items: ItemType[] = Object.entries(poiListsSetting).map(
    ([key, value]) => {
      const { id } = feature;
      const isPoiSaved = checkPoiSavedStatus(key, id);
      return {
        key,
        label: value,
        icon: getMenuItemIcon(key, isPoiSaved),
      };
    }
  );

  const handleListMenuOnClick = ({ item, key }) => {
    if (key === NEW_LIST) {
      // Todo: handle add new list
      return;
    }

    const {
      id,
      properties: { name, type },
      geometry,
      // @ts-ignore
      _z,
    } = feature;
    const isPoiSaved: boolean = checkPoiSavedStatus(key, id);
    let coordinates = [0, 0];
    if (geometry.type === "Point") {
      coordinates = geometry.coordinates.slice();
    }
    if (isPoiSaved) {
      dispatch(
        deletePoiFromLists({
          id,
          listName: key,
        })
      );
      message.success(`Removed it to ${poiListsSetting[key]} list`);
    } else {
      dispatch(
        postPoiToLists({
          listName: key,
          payload: {
            id,
            name,
            type,
            coordinates,
            zoom: _z,
          },
        })
      );
      message.success(`Added it to ${poiListsSetting[key]} list`);
    }
  };

  const menu = (
    <Menu
      data-testid="list-menu"
      onClick={handleListMenuOnClick}
      items={[
        ...items,
        {
          type: "divider",
        },
        {
          label: "New list",
          key: NEW_LIST,
          icon: <PlusOutlined />,
        },
      ]}
    />
  );

  return (
    <Card
      bordered={false}
      style={{ width: 300 }}
      actions={[
        <Dropdown overlay={menu} placement="bottom" trigger={["click"]}>
          <Button
            data-testid="save-to-list"
            shape="circle"
            icon={<BookOutlined />}
          />
        </Dropdown>,
        <Button shape="circle" icon={<UnorderedListOutlined />} />,
        <Button shape="circle" icon={<EllipsisOutlined />} />,
      ]}
    >
      <Meta title={name} description={type} />
    </Card>
  );
}

export default PoiInfoCard;
