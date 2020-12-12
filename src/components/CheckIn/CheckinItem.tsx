import { formatDate } from "lib/utils";
import React from "react";
import Button, { ButtonTypes } from "../Button/button";

const CheckinItem = (props: {
  date?: string;
  onEdit: Function;
  onAddNew?: Function;
  onDelete: Function;
  title: string;
  checkedIn?: Boolean;
  children: any;
  disableDelete?: Boolean;
  disableEdit?: Boolean;
}) => {
  return (
    <div className="checkin__item">
      <div className="checkin__item--head">
        <div className="item__head--title">{props.title}</div>
        <div className="item__head--actions">
          {props.checkedIn ? (
            <>
              <input
                defaultValue={
                  // @ts-ignore
                  formatDate(props?.date)
                }
                disabled
              />
              {!props.disableEdit ? (
                <Button type={ButtonTypes.primary} onClick={() => props.onEdit()}>
                  Edit Result
                </Button>
              ) : null}
              {!props.disableDelete ? (
                <Button
                  type={ButtonTypes.orange}
                  onClick={() => props.onDelete()}
                >
                  Delete Result
                </Button>
              ) : null}
            </>
          ) : (
              <>
                <Button
                  onClick={() => (props.onAddNew ? props.onAddNew() : undefined)}
                >
                  Add New Result
              </Button>
              </>
            )}
        </div>
      </div>

      <div className="checkin__item--content">{props.children}</div>
    </div>
  );
};

export default CheckinItem;
