"use strict";
/**
 * SECTION 103: HOLOGRAPHIC FINANCIAL DATA VISUALIZATION ENGINE
 * Ultimate Nuclear Spec — volumetric rendering, spatial light modulators,
 * haptic holography, multi-user collaboration, financial chart types,
 * gesture/eye/voice navigation, and holographic export/security
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolographicVisualizationService = void 0;
// ======================================================================
// HOLOGRAPHIC VISUALIZATION SERVICE
// ======================================================================
class HolographicVisualizationService {
    displays = new Map();
    sessions = new Map();
    charts = new Map();
    // ---- DISPLAY MANAGEMENT ----------------------------------------------
    registerDisplay(display) {
        this.displays.set(display.displayId, display);
    }
    getDisplay(id) {
        return this.displays.get(id);
    }
    listDisplays(loc) {
        const all = Array.from(this.displays.values());
        return loc ? all.filter(d => d.location === loc) : all;
    }
    // ---- SESSION MANAGEMENT ----------------------------------------------
    startSession(userId, displayId, navMode) {
        const session = {
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
    addCollaborator(sessionId, collaboratorId) {
        const s = this.sessions.get(sessionId);
        if (s && !s.collaborators.includes(collaboratorId))
            s.collaborators.push(collaboratorId);
    }
    endSession(sessionId) {
        this.sessions.delete(sessionId);
    }
    // ---- CHART MANAGEMENT ------------------------------------------------
    registerChart(chart) {
        this.charts.set(chart.chartId, chart);
    }
    activateChart(sessionId, chartId) {
        const s = this.sessions.get(sessionId);
        const c = this.charts.get(chartId);
        if (!s || !c)
            return false;
        if (!s.activeCharts.includes(chartId))
            s.activeCharts.push(chartId);
        return true;
    }
    // ---- RENDER PIPELINE -------------------------------------------------
    /**
     * Build a serializable render descriptor for the holographic display engine.
     * Production: this feeds a C++ rendering daemon or WebXR/Three.js spatial layer.
     */
    buildRenderDescriptor(sessionId, frameNumber) {
        const s = this.sessions.get(sessionId);
        if (!s)
            return null;
        const activeCharts = s.activeCharts
            .map(id => this.charts.get(id))
            .filter(Boolean);
        const maxQuality = activeCharts.reduce((best, c) => {
            const order = ['DRAFT', 'STANDARD', 'HIGH', 'ULTRA', 'PHOTOREALISTIC'];
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
    processGesture(sessionId, gesture) {
        const s = this.sessions.get(sessionId);
        if (!s || s.navigationMode !== 'GESTURE')
            return { action: 'NOOP' };
        if (gesture.confidence < 0.7)
            return { action: 'NOOP' };
        const gestureActions = {
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
    analyzeGaze(sessionId, gazeData) {
        const s = this.sessions.get(sessionId);
        if (!s)
            return { heatmap: {}, dwellTimes: {}, saccadicPattern: 'UNKNOWN', cognitiveLoad: 0 };
        const heatmap = {};
        const dwellTimes = {};
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
    exportChart(chartId, format, security) {
        const sizeMap = {
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
    buildSpatialAudioScene(config, charts) {
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
    createFinancialChartTemplate(type, dataSource) {
        const templates = {
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
exports.HolographicVisualizationService = HolographicVisualizationService;
