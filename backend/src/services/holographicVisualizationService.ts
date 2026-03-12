/**
 * SECTION 103: HOLOGRAPHIC FINANCIAL DATA VISUALIZATION ENGINE
 * Ultimate Nuclear Spec — volumetric rendering, spatial light modulators,
 * haptic holography, multi-user collaboration, financial chart types,
 * gesture/eye/voice navigation, and holographic export/security
 */

export type DisplayTechnology = 'VOLUMETRIC' | 'LIGHT_FIELD' | 'INTEGRAL_IMAGING' | 'LASER_PROJECTION' | 'FOG_SCREEN' | 'RETINAL_SCAN' | 'ULTRASONIC_LEVITATION';
export type HoloChartType = 'CANDLESTICK_3D' | 'NETWORK_GRAPH' | 'GEO_MAP' | 'PORTFOLIO_CLUSTER' | 'RISK_LANDSCAPE' | 'CASHFLOW_STREAM' | 'BUDGET_CONTAINER' | 'GOAL_TRAJECTORY' | 'FORECAST_CONE' | 'CORRELATION_MATRIX' | 'DISTRIBUTION_CLOUD' | 'ANOMALY_HIGHLIGHT';
export type NavigationModality = 'GESTURE' | 'EYE_TRACKING' | 'VOICE' | 'TOUCH' | 'BRAIN_COMPUTER';
export type HoloRenderQuality = 'DRAFT' | 'STANDARD' | 'HIGH' | 'ULTRA' | 'PHOTOREALISTIC';

export interface HolographicDisplay {
  displayId: string;
  technology: DisplayTechnology;
  resolution: { x: number; y: number; z: number };   // voxels
  refreshRateHz: number;
  colorDepth: number;           // bits per voxel
  viewingVolumeM3: number;      // cubic meters
  latencyMs: number;
  maxViewers: number;
  hapticFeedback: boolean;
  eyeTrackingEnabled: boolean;
  gestureRecognitionEnabled: boolean;
  voiceEnabled: boolean;
  multiUserSync: boolean;
  location: 'DESKTOP' | 'TABLE' | 'ROOM_SCALE' | 'OUTDOOR';
}

export interface HoloChartConfig {
  chartId: string;
  type: HoloChartType;
  dataSource: string;           // e.g. 'account_transactions' | 'portfolio_holdings'
  dimensions: { x: string; y: string; z: string; color?: string; size?: string };
  timeRange?: { from: string; to: string };
  filters?: Record<string, string | number>;
  renderQuality: HoloRenderQuality;
  animationEnabled: boolean;
  animationDurationMs?: number;
  depthPerceptionEnabled: boolean;
  collisionDetection: boolean;
  annotations: HoloAnnotation[];
  interactionHandlers: NavigationModality[];
  privacy: { blurredForNonOwners: boolean; authenticationRequired: boolean };
}

export interface HoloAnnotation {
  annotationId: string;
  position3D: { x: number; y: number; z: number };
  text: string;
  type: 'LABEL' | 'ALERT' | 'TREND_LINE' | 'SUPPORT_RESISTANCE' | 'AI_INSIGHT';
  color?: string;
  timestamp?: string;
  linkedDataPoint?: string;
}

export interface HoloSession {
  sessionId: string;
  userId: string;
  displayId: string;
  activeCharts: string[];
  collaborators: string[];
  startedAt: string;
  lastInteractionAt: string;
  navigationMode: NavigationModality;
  recordingEnabled: boolean;
  renderStats: { framesRendered: number; avgFrameTimeMs: number; droppedFrames: number };
}

export interface GestureCommand {
  gestureType: 'PINCH' | 'SWIPE' | 'ROTATE' | 'EXPAND' | 'POINT' | 'GRAB' | 'SHAKE' | 'FLICK';
  fingersUsed?: number;
  directionVector?: { x: number; y: number; z: number };
  velocity?: number;    // m/s
  confidence: number;   // 0-1
  timestamp: string;
}

export interface EyeTrackingData {
  gazePoint3D: { x: number; y: number; z: number };
  fixationDurationMs: number;
  saccadeVelocityDegPerSec: number;
  pupilDiameterMm: number;
  blinkRate: number;
  attentionScore: number;   // 0-1 derived from fixation patterns
  timestamp: string;
}

export interface SpatialAudioConfig {
  enabled: boolean;
  spatializationAlgorithm: 'HRTF' | 'AMBISONICS' | 'BINAURAL';
  reverbRoomSize: 'SMALL' | 'MEDIUM' | 'LARGE';
  dataAudification: boolean;   // Pitch/rhythm maps to data values
}

export type HoloExportFormat = 'HOLOGRAM_SEQUENCE' | 'POINT_CLOUD_PLY' | 'VOLUMETRIC_VIDEO' | 'STANDARD_3D_GLTF' | 'FLAT_PNG' | 'FLAT_PDF' | 'INTERACTIVE_HTML';

export interface HoloSecurityConfig {
  encryptionAlgorithm: 'AES-256-GCM' | 'CHACHA20-POLY1305';
  biometricWatermark: boolean;   // Invisible ID embedded in hologram
  captureProtection: boolean;    // Anti-screenshot / anti-photography
  viewerAuthRequired: boolean;
  sessionTimeout: number;        // seconds
  auditLogging: boolean;
}

// ======================================================================
// HOLOGRAPHIC VISUALIZATION SERVICE
// ======================================================================

export class HolographicVisualizationService {
  private displays: Map<string, HolographicDisplay> = new Map();
  private sessions: Map<string, HoloSession> = new Map();
  private charts: Map<string, HoloChartConfig> = new Map();

  // ---- DISPLAY MANAGEMENT ----------------------------------------------

  registerDisplay(display: HolographicDisplay): void {
    this.displays.set(display.displayId, display);
  }

  getDisplay(id: string): HolographicDisplay | undefined {
    return this.displays.get(id);
  }

  listDisplays(loc?: HolographicDisplay['location']): HolographicDisplay[] {
    const all = Array.from(this.displays.values());
    return loc ? all.filter(d => d.location === loc) : all;
  }

  // ---- SESSION MANAGEMENT ----------------------------------------------

  startSession(userId: string, displayId: string, navMode: NavigationModality): HoloSession {
    const session: HoloSession = {
      sessionId: `holo-${Date.now()}-${userId.slice(0, 6)}`,
      userId, displayId, activeCharts: [], collaborators: [],
      startedAt: new Date().toISOString(),
      lastInteractionAt: new Date().toISOString(),
      navigationMode: navMode, recordingEnabled: false,
      renderStats: { framesRendered: 0, avgFrameTimeMs: 0, droppedFrames: 0 },
    };
    this.sessions.set(session.sessionId, session);
    return session;
  }

  addCollaborator(sessionId: string, collaboratorId: string): void {
    const s = this.sessions.get(sessionId);
    if (s && !s.collaborators.includes(collaboratorId)) s.collaborators.push(collaboratorId);
  }

  endSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // ---- CHART MANAGEMENT ------------------------------------------------

  registerChart(chart: HoloChartConfig): void {
    this.charts.set(chart.chartId, chart);
  }

  activateChart(sessionId: string, chartId: string): boolean {
    const s = this.sessions.get(sessionId);
    const c = this.charts.get(chartId);
    if (!s || !c) return false;
    if (!s.activeCharts.includes(chartId)) s.activeCharts.push(chartId);
    return true;
  }

  // ---- RENDER PIPELINE -------------------------------------------------

  /**
   * Build a serializable render descriptor for the holographic display engine.
   * Production: this feeds a C++ rendering daemon or WebXR/Three.js spatial layer.
   */
  buildRenderDescriptor(sessionId: string, frameNumber: number): {
    session: HoloSession;
    charts: HoloChartConfig[];
    renderQuality: HoloRenderQuality;
    frameNumber: number;
    lightingConfig: Record<string, number>;
    depthSortingOrder: string[];
  } | null {
    const s = this.sessions.get(sessionId);
    if (!s) return null;

    const activeCharts = s.activeCharts
      .map(id => this.charts.get(id))
      .filter(Boolean) as HoloChartConfig[];

    const maxQuality = activeCharts.reduce<HoloRenderQuality>((best, c) => {
      const order: HoloRenderQuality[] = ['DRAFT', 'STANDARD', 'HIGH', 'ULTRA', 'PHOTOREALISTIC'];
      return order.indexOf(c.renderQuality) > order.indexOf(best) ? c.renderQuality : best;
    }, 'STANDARD');

    return {
      session: s,
      charts: activeCharts,
      renderQuality: maxQuality,
      frameNumber,
      lightingConfig: { ambientIntensity: 0.3, pointLightX: 0.5, pointLightY: 1.0, pointLightZ: -0.5, shadowSoftness: 0.8 },
      depthSortingOrder: activeCharts.map(c => c.chartId),
    };
  }

  // ---- GESTURE PROCESSING ----------------------------------------------

  processGesture(sessionId: string, gesture: GestureCommand): {
    action: string; targetChartId?: string; params?: Record<string, number | string>;
  } {
    const s = this.sessions.get(sessionId);
    if (!s || s.navigationMode !== 'GESTURE') return { action: 'NOOP' };
    if (gesture.confidence < 0.7) return { action: 'NOOP' };

    const gestureActions: Record<GestureCommand['gestureType'], string> = {
      PINCH: 'ZOOM_IN', EXPAND: 'ZOOM_OUT', SWIPE: 'PAN',
      ROTATE: 'ROTATE_VIEW', POINT: 'SELECT_ELEMENT',
      GRAB: 'DRAG_CHART', SHAKE: 'RESET_VIEW', FLICK: 'DISMISS',
    };

    return {
      action: gestureActions[gesture.gestureType],
      targetChartId: s.activeCharts[0],
      params: gesture.directionVector ? {
        dx: gesture.directionVector.x,
        dy: gesture.directionVector.y,
        dz: gesture.directionVector.z,
        velocity: gesture.velocity ?? 0,
      } : undefined,
    };
  }

  // ---- EYE TRACKING ANALYTICS ------------------------------------------

  analyzeGaze(sessionId: string, gazeData: EyeTrackingData[]): {
    heatmap: Record<string, number>;    // chartId -> attention score
    dwellTimes: Record<string, number>; // chartId -> ms
    saccadicPattern: string;
    cognitiveLoad: number;              // 0-1 derived from pupillometry
  } {
    const s = this.sessions.get(sessionId);
    if (!s) return { heatmap: {}, dwellTimes: {}, saccadicPattern: 'UNKNOWN', cognitiveLoad: 0 };

    const heatmap: Record<string, number> = {};
    const dwellTimes: Record<string, number> = {};

    for (const g of gazeData) {
      // Map gaze to nearest chart (simplified spatial lookup)
      const chartId = s.activeCharts[0] ?? 'unknown';
      heatmap[chartId] = (heatmap[chartId] ?? 0) + g.attentionScore;
      dwellTimes[chartId] = (dwellTimes[chartId] ?? 0) + g.fixationDurationMs;
    }

    // Pupillometry → cognitive load
    const avgPupil = gazeData.reduce((s, g) => s + g.pupilDiameterMm, 0) / Math.max(1, gazeData.length);
    const baselinePupil = 3.5; // mm baseline
    const cognitiveLoad = Math.min(1, Math.max(0, (avgPupil - baselinePupil) / 2));

    const avgSaccade = gazeData.reduce((s, g) => s + g.saccadeVelocityDegPerSec, 0) / Math.max(1, gazeData.length);
    const saccadicPattern = avgSaccade > 400 ? 'SCANNING' : avgSaccade > 200 ? 'READING' : 'FOCUSED_FIXATION';

    return { heatmap, dwellTimes, saccadicPattern, cognitiveLoad };
  }

  // ---- EXPORT & SECURITY -----------------------------------------------

  exportChart(chartId: string, format: HoloExportFormat, security: HoloSecurityConfig): {
    exportId: string;
    format: HoloExportFormat;
    encrypted: boolean;
    watermarked: boolean;
    fileSizeEstimateKB: number;
    expiresAt?: string;
  } {
    const sizeMap: Record<HoloExportFormat, number> = {
      HOLOGRAM_SEQUENCE: 50000, POINT_CLOUD_PLY: 25000, VOLUMETRIC_VIDEO: 200000,
      STANDARD_3D_GLTF: 5000, FLAT_PNG: 500, FLAT_PDF: 1000, INTERACTIVE_HTML: 2000,
    };
    return {
      exportId: `export-${chartId}-${Date.now()}`,
      format, encrypted: security.encryptionAlgorithm !== undefined,
      watermarked: security.biometricWatermark,
      fileSizeEstimateKB: sizeMap[format],
      expiresAt: security.sessionTimeout
        ? new Date(Date.now() + security.sessionTimeout * 1000).toISOString()
        : undefined,
    };
  }

  // ---- SPATIAL AUDIO ---------------------------------------------------

  buildSpatialAudioScene(config: SpatialAudioConfig, charts: HoloChartConfig[]): {
    audioNodes: Array<{ chartId: string; position3D: [number, number, number]; pitch?: number; volume?: number }>;
    ambientSoundscape: string;
  } {
    return {
      audioNodes: charts.map((c, i) => ({
        chartId: c.chartId,
        position3D: [i * 0.5, 0, 0],
        pitch: config.dataAudification ? 440 + i * 50 : undefined,
        volume: 0.3,
      })),
      ambientSoundscape: config.reverbRoomSize === 'LARGE' ? 'concert_hall' : 'office_room',
    };
  }

  // ---- CHART FACTORY ---------------------------------------------------

  /** Create pre-configured chart templates for common financial data */
  createFinancialChartTemplate(type: HoloChartType, dataSource: string): HoloChartConfig {
    const templates: Record<HoloChartType, Partial<HoloChartConfig>> = {
      CANDLESTICK_3D: { dimensions: { x: 'time', y: 'price', z: 'volume', color: 'direction' } },
      NETWORK_GRAPH: { dimensions: { x: 'node_x', y: 'node_y', z: 'cluster', color: 'risk_score', size: 'transaction_count' } },
      GEO_MAP: { dimensions: { x: 'longitude', y: 'latitude', z: 'volume', color: 'transaction_type' } },
      PORTFOLIO_CLUSTER: { dimensions: { x: 'return', y: 'risk', z: 'sector', color: 'asset_class', size: 'weight' } },
      RISK_LANDSCAPE: { dimensions: { x: 'probability', y: 'impact', z: 'time_horizon', color: 'category' } },
      CASHFLOW_STREAM: { dimensions: { x: 'time', y: 'amount', z: 'source', color: 'type' } },
      BUDGET_CONTAINER: { dimensions: { x: 'category', y: 'amount', z: 'period', color: 'status' } },
      GOAL_TRAJECTORY: { dimensions: { x: 'time', y: 'progress', z: 'goal_type', color: 'on_track' } },
      FORECAST_CONE: { dimensions: { x: 'time', y: 'value', z: 'confidence', color: 'scenario' } },
      CORRELATION_MATRIX: { dimensions: { x: 'asset_a', y: 'asset_b', z: 'correlation', color: 'significance' } },
      DISTRIBUTION_CLOUD: { dimensions: { x: 'value', y: 'density', z: 'category', color: 'percentile' } },
      ANOMALY_HIGHLIGHT: { dimensions: { x: 'time', y: 'amount', z: 'risk_score', color: 'anomaly_type' } },
    };

    return {
      chartId: `chart-${type.toLowerCase()}-${Date.now()}`,
      type, dataSource,
      dimensions: templates[type]?.dimensions ?? { x: 'x', y: 'y', z: 'z' },
      renderQuality: 'HIGH',
      animationEnabled: true, animationDurationMs: 2000,
      depthPerceptionEnabled: true, collisionDetection: false,
      annotations: [], interactionHandlers: ['GESTURE', 'EYE_TRACKING', 'VOICE'],
      privacy: { blurredForNonOwners: true, authenticationRequired: true },
    };
  }
}
