import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FC } from "react";

import { Button } from "@/components/Button";
import { LinkPreview } from "@/components/LinkPreview";
import { useCurrentFormContext, useLinksContext } from "@/contexts";
import { Link } from "@/types";

import { LinkForm } from "../LinkForm/LinkForm";

type GroupPreviewProps = {
  id: string;
  children: Array<Link>;
};

export const GroupPreview: FC<GroupPreviewProps> = ({ id, children }) => {
  const { currentForm, setCurrentForm } = useCurrentFormContext();
  const { handleDragEnd } = useLinksContext();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div key={id} className="rounded-lg mb-9 border border-solid">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={children ? children.map((child) => child.id) : []}
          strategy={verticalListSortingStrategy}
        >
          <ul>
            {children.map((link) => (
              <LinkPreview {...link} nestingLevel={0} key={link.id} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      {children.length > 0 && (
        <>
          {currentForm && (
            <div className="px-6 bg-background-primary py-5">{currentForm}</div>
          )}
          <div className="py-5 bg-background-secondary px-6 rounded-b-lg">
            <Button
              variant="primary"
              onClick={() =>
                setCurrentForm(
                  <LinkForm
                    parentId={children[0].parentId}
                    nestingLevel={children[0].nestingLevel}
                  />
                )
              }
            >
              Dodaj pozycję menu
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
