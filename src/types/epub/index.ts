export * from './book'
export * from './highlight'
export * from './loc'
export * from './page'
export * from './selection'
export * from './snackbar'
export * from './toc'
export * from './viewerLayout'

import { Contents, Rendition } from 'epubjs'
import Book, { BookOptions } from 'epubjs/types/book'
import { RenditionOptions } from 'epubjs/types/rendition'
import * as React from 'react'
import { BookOption, BookStyle } from './book'
import Page from './page'
import Toc from './toc'
import ViewerLayout from './viewerLayout'

/**
 * DOM Element wrapping the Epub viewer
 * - Provides special methods.
 */
export interface ViewerRef extends HTMLDivElement {
  /** Move the viewer to the previous page */
  prevPage: () => void
  /** Move the viewer to the next page */
  nextPage: () => void
  /** Get CFI in current page */
  getCurrentCfi: () => string
  /**
   * Highlighting specific CFIRange
   * @param cfiRange CFIRange
   * @param callback Callback after click highlight
   * @param color Highlight color
   */
  onHighlight: (
    cfiRange: string,
    callback: (e: any) => void,
    color?: string,
  ) => void
  /**
   * Remove specific highlight
   * @param cfiRange CFIRange
   */
  offHighlight: (cfiRange: string) => void
  /**
   * Move the viewer to the cfi or href
   * @param location CFI or Href
   */
  setLocation: (location: string) => void
}

/**
 * Epub Viewer Props
 * @type
 * @param url Epub file path
 * @param epubFileOptions Epub file option
 * @param epubOptions Epub viewer option
 * @param style Epub Wrapper style
 * @param location Epub CFI or href
 * @param bookChanged Run when book changed
 * @param rendtionChanged Run when rendition changed
 * @param pageChanged Run when page changed
 * @param tocChanged Run when toc changed
 * @param selectionChanged Run when selected
 * @param loadingView Loading Component
 */
export interface EpubViewerProps {
  url: string
  epubFileOptions?: BookOptions
  epubOptions?: RenditionOptions
  style?: Object
  location?: string
  bookChanged?(book: Book): void
  rendtionChanged?(rendition: Rendition): void
  pageChanged?(page: Page): void
  tocChanged?(value: Toc[]): void
  selectionChanged?(cfiRange: string, contents: Contents): void
  loadingView?: React.ReactNode
}

declare class EpubViewer extends React.Component<EpubViewerProps, ViewerRef> {}

/**
 * React Epub Viewer Props
 * @type
 * @param url Epub file path
 * @param viewerLayout Viewer layout
 * @param viewerStyle Viewer style
 * @param viewerOption Viewer option
 * @param onBookInfoChange Run when book information changed
 * @param onPageChange Run when page changed
 * @param onTocChange Run when toc changed
 * @param onSelection Run when selected
 * @param loadingView Loading component
 */
export interface ReactViewerProps {
  url: string
  viewerLayout?: ViewerLayout
  viewerStyle?: BookStyle
  viewerOption?: BookOption
  viewerStyleURL?: string
  onBookInfoChange?: (book: any) => void
  onPageChange?: (page: Page) => void
  onTocChange?: (toc: Toc[]) => void
  onSelection?: (cfiRange: string, contents: Contents) => void
  loadingView?: React.ReactNode
}

declare class ReactEpubViewer extends React.Component<
  ReactViewerProps,
  ViewerRef
> {}

export { EpubViewer, ReactEpubViewer }
