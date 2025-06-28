'use client';

import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchPersonalizedContent, reorderContent } from '@/store/slices/contentSlice';
import ContentCard from './ContentCard';
import ContentSkeleton from './ContentSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ContentItem } from '@/store/slices/contentSlice';

interface SortableContentCardProps {
  item: ContentItem;
  index: number;
}

const SortableContentCard: React.FC<SortableContentCardProps> = ({ item, index }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ContentCard item={item} index={index} />
    </div>
  );
};

const ContentFeed: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, hasMore, currentPage } = useSelector((state: RootState) => state.content);
  const { preferences } = useSelector((state: RootState) => state.user);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchPersonalizedContent({ categories: preferences.categories, page: 1 }));
    }
  }, [dispatch, preferences.categories, items.length]);

  const fetchMoreData = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchPersonalizedContent({ 
        categories: preferences.categories, 
        page: currentPage + 1 
      }));
    }
  }, [dispatch, preferences.categories, currentPage, loading, hasMore]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      dispatch(reorderContent(newItems));
    }
  };

  if (loading && items.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ContentSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Your Personalized Feed
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm text-muted-foreground"
        >
          {items.length} items • Drag to reorder
        </motion.p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map(item => item.id)} strategy={rectSortingStrategy}>
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <ContentSkeleton key={`loader-${index}`} />
                ))}
              </div>
            }
            endMessage={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <p className="text-muted-foreground">You've reached the end! 🎉</p>
              </motion.div>
            }
          >
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SortableContentCard item={item} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </InfiniteScroll>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ContentFeed;