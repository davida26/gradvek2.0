package com.semis.gradvek.entity;

import java.lang.reflect.InvocationTargetException;
import java.util.logging.Logger;

import org.apache.parquet.example.data.Group;

import com.semis.gradvek.springdb.Importer;

/**
 * The factory class capable of creating entities representing OpenTarget data by type
 * through reflection 
 * @author ymachkasov
 *
 */
public class EntityFactory {
	private static final Logger mLogger = Logger.getLogger (EntityFactory.class.getName ());


	/**
	 * Creates an entity of a certain type from the Parquet data for it
	 * @param <T> returned entity type
	 * @param entityClass the required entity class 
	 * @param parquet the Parquet data for this entity
	 * @return The created instance of the specified type
	 */
	public static <T extends Entity> T fromParquet (Class<T> entityClass,  Importer importer, Group parquet) {
		try {
			T ret = entityClass.getConstructor (Importer.class, Group.class).newInstance (importer, parquet);
			if (ret.filter (parquet)) {
				return (ret);
			} else {
				return (null);
			}
		} catch (NoSuchMethodException | IllegalAccessException | InstantiationException cx) {
			mLogger.info ("Couldn't create entity of type " + entityClass.getName () + " - no accessible constructor from Parquet");
			return null;
		} catch (InvocationTargetException itx) {
			mLogger.info ("Couldn't create entity of type " + entityClass.getName () + " - cause " +
					itx.getCause ());
			return (null);
		}
	}
}
