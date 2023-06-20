import { connect, signals } from '@ombori/ga-module';
import { GridSignals } from '@ombori/grid-signals';

import { Settings } from './schema.js';

// TODO: Update 'name' field in package.json with 'organisation-name.module-name' identifier
// TODO: Update 'description' field in package.json with module's descriptive name
// TODO: Update 'container-registry' field in package.json with your container registry hostname
// TODO: Create .env file with <your-registry>_USERNAME and <your-registry>_PASSWORD values

const module = await connect<Settings>({ skipGridSignalsInit: true });

const signalsExample = async () => {
  const signalsInstance = new GridSignals();

  // This just initialize the instance by getting the signals parameters from the process.env
  // Here you can override the 
  signalsInstance.initEdgeApp();

  // manually generate a sessionId without sending a session to signals service
  const { sessionId, sessionCreated } = signals.generateSession();
  // manually set a sessionId and sessionCreated date on the current instance
  signalsInstance.setInstanceProps({ sessionId, sessionCreated });

  // get current instance properties
  const instanceProps = signalsInstance.getInstanceProps();

  // manually send session
  const resSession = await signals.sendRawSession({
    sessionId: instanceProps.sessionId,
    sessionCreated: new Date().toISOString(), // or sessionCreated
    tenantId: instanceProps.tenantId,
    environment: instanceProps.environment,
    dataResidency: instanceProps.dataResidency,
    country: instanceProps.country,
    spaceId: instanceProps.spaceId,
    appId: instanceProps.appId,
    appVersion: instanceProps.appVersion,
    installationId: instanceProps.installationId,
    installationVersion: instanceProps.installationVersion,
    deviceId: instanceProps.deviceId,
    clientId: instanceProps.clientId,
  });
  
  console.log('resSession:', resSession);
  // output:  { status: 200, statusText: 'OK', ...}

  // Caching of sessions, events and timestamps will handled by sesame edge app
  // Manually send event
  // APP_START eventType is the standard event to capture the application level start event
  const resEvent = await signals.sendRawEvent({
    tenantId: instanceProps.tenantId,
    spaceId: instanceProps.spaceId,
    eventTime: new Date().toISOString(),
    dataResidency: instanceProps.dataResidency,
    sessionId: instanceProps.sessionId,
    clientId: instanceProps.clientId,
    eventType: 'APP_START',
    interaction: false,
    int1: 1,
    int2: 1,
    str1: 'abc',
    str2: 'def',
    // add more
  });

  console.log('resEvent:', resEvent);
  // output:  { status: 200, statusText: 'OK', ...}
};

await signalsExample();

// Definitions

/*** Instance Props ***/
// accessId: string;
// accessToken: string;
// lastActivity: string;
// sessionId: string;
// sessionCreated: string;
// tenantId: string;
// environment: string;
// dataResidency: string;
// country: string;
// locationAccuracy?: number;
// latitude?: number;
// longitude?: number;
// spaceId: string;
// appId: string;
// appVersion?: string;
// installationId: string;
// installationVersion?: string;
// deviceId?: string | null;
// clientId: string | null;
// clientCreated: string | null;
// clientUserAgent: string | null;
// clientScreenWidth?: number;
// clientScreenHeight?: number;
// clientScreenColorDepth?: number;
// clientScreenPixelDepth?: number;

/*** Session Props (sendRawSession)***/
// sessionId: string;
// sessionCreated: string;
// tenantId: string;
// environment: string;
// dataResidency: string;
// country: string;
// locationAccuracy?: number;
// latitude?: number;
// longitude?: number;
// spaceId: string;
// appId: string;
// appVersion?: string;
// installationId: string;
// installationVersion?: string;
// deviceId?: string | null;
// clientId: string | null;

/*** Event Props (sendRawEvent)***/
// tenantId: string;
// eventTime: string;
// dataResidency: string;
// sessionId: string;
// clientId: string | null;
// spaceId: string;
// eventType: string;
// interaction: boolean;
// productId?: string;
// categoryId?: string;
// int1?: number;
// int2?: number;
// int3?: number;
// int4?: number;
// int5?: number;
// str1?: string;
// str2?: string;
// str3?: string;
// str4?: string;
// str5?: string;
// stateful?: boolean;
// public?: number;