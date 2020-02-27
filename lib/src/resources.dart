// Copyright (c) 2020, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:stagexl/stagexl.dart';

ResourceManager _resourceManager;

ResourceManager get resourceManager {
  if (_resourceManager == null) {
    throw StateError('ResourceManager not initialized');
  }
  return _resourceManager;
}

void initializeResources(ResourceManager resourceManager) {
  if (_resourceManager != null) throw StateError('already initialized');
  _resourceManager = resourceManager;
}
